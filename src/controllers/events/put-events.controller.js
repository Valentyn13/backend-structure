const betService = require("../../services/bet.service");
const eventService = require("../../services/events.service");
const transformProps = require("../../helpers/transform-props");

const putEventController = async (req, res) => {
  try {
    const eventId = req.params.id;

    const bets = await betService.createBet(eventId);

    const [w1, w2] = req.body.score.split(":");
    let result;
    if (+w1 > +w2) {
      result = "w1";
    } else if (+w2 > +w1) {
      result = "w2";
    } else {
      result = "x";
    }
    const event = await eventService.updateEvent(eventId, {
      score: req.body.score,
    });

    Promise.all(
      bets.map((bet) => {
        if (bet.prediction == result) {
          betService.updateBet(bet.id, { win: true });
          betService.getUserByBetUserId(bet.user_id).then(([user]) => {
            return betService.updateUserAfterBet(bet.user_id, {
              balance: user.balance + bet.bet_amount * bet.multiplier,
            });
          });
        } else if (bet.prediction != result) {
          return betService.updateBet(bet.id, { win: false });
        }
      })
    );
    setTimeout(() => {
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
        ],
        event
      );

      res.send(event);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = putEventController;
