const userService = require("../../services/user.service");
const eventService = require("../../services/events.service");
const betService = require("../../services/bet.service");
const statEmitter = require("../../socket/connection");
const transformProps = require("../../helpers/transform-props");
const getIdFromToken = require("../../helpers/get-token");

const createBetController = async (req, res) => {
  let userId = getIdFromToken(req.headers["authorization"]);
  try {
    req.body.event_id = req.body.eventId;
    req.body.bet_amount = req.body.betAmount;
    delete req.body.eventId;
    delete req.body.betAmount;
    req.body.user_id = userId;

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(400).send({ error: "User does not exist" });
      return;
    }

    if (+user.balance < +req.body.bet_amount) {
      return res.status(400).send({ error: "Not enough balance" });
    }
    const event = await eventService.findEvent(req.body.event_id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    const odds = await eventService.findOdd(event.odds_id);

    if (!odds) {
      return res.status(404).send({ error: "Odds not found" });
    }
    let multiplier;
    switch (req.body.prediction) {
      case "w1":
        multiplier = odds.home_win;
        break;
      case "w2":
        multiplier = odds.away_win;
        break;
      case "x":
        multiplier = odds.draw;
        break;
    }
    const bet = await betService.insertBet({
      ...req.body,
      multiplier,
      event_id: event.id,
    });
    var currentBalance = user.balance - req.body.bet_amount;
    userService.updateUserBalance(userId, currentBalance).then(() => {
      statEmitter.emit("newBet");
    });

    transformProps(
      [
        "bet_amount",
        "event_id",
        "away_team",
        "home_team",
        "odds_id",
        "start_at",
        "updated_at",
        "created_at",
        "user_id",
      ],
      bet
    );

    return res.send({
      ...bet,
      currentBalance: currentBalance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = createBetController;
