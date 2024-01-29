const eventService = require("../../services/events.service");
const statEmitter = require("../../socket/connection");
const transformProps = require("../../helpers/transform-props");
const toSnakeCase = require('../../helpers/to-snake-case')

const createEventsController = async (req, res) => {
  try {
    toSnakeCase(req.body.odds)

    const odds = await eventService.createOdd(req.body.odds);

    delete req.body.odds;
    toSnakeCase(req.body)

    const event = await eventService.addEvent({
      ...req.body,
      odds_id: odds.id,
    });
    statEmitter.emit("newEvent");

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

    transformProps(["home_win", "away_win", "created_at", "updated_at"], odds);

    return res.send({
      ...event,
      odds,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = createEventsController;
