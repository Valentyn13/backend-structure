const Enum = require("../../helpers/enum-factory/enum-factory");
const apiPath = Enum({
  HEALTH: "/health",
  USERS: "/users",
  USERS_ID: "/users/:id",
  TRANSACTIONS: "/transactions",
  EVENTS: "/events",
  EVENTS_ID: "/events/:id",
  BETS: "/bets",
  STATS: "/stats",
});

module.exports = apiPath;
