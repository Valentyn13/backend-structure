const eventService = require('../../services/events.service')
const statEmitter = require('../../socket/connection')
const transformProps = require('../../helpers/transform-props')

const createEventsController = async (req, res) => {

    try {
        req.body.odds.home_win = req.body.odds.homeWin;
        delete req.body.odds.homeWin;
        req.body.odds.away_win = req.body.odds.awayWin;
        delete req.body.odds.awayWin;

        const odds = await eventService.createOdd(req.body.odds)

        delete req.body.odds;
        req.body.away_team = req.body.awayTeam;
        req.body.home_team = req.body.homeTeam;
        req.body.start_at = req.body.startAt;
        delete req.body.awayTeam;
        delete req.body.homeTeam;
        delete req.body.startAt;

        const event = await eventService.addEvent({...req.body,odds_id: odds.id,})
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


          transformProps(
            ["home_win", "away_win", "created_at", "updated_at"],
            odds
          );

          return res.send({
            ...event,
            odds,
          });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        return;
    }

}

module.exports = createEventsController