const apiPath = require("../common/enums/api-path.enum");

const initHealth = require("./health/health.api");
const initUsers = require("./users/users.api");
const initTransactions = require("./transactions/transactions.api");
const initEvents = require("./events/events.api");
const initBets = require("./bets/bets.api");
const initStats = require("./stats/stats.api");

const initApi = (Router) => {
  const apiRouter = new Router();

  apiRouter.use(apiPath.HEALTH, initHealth(Router));
  apiRouter.use(apiPath.USERS, initUsers(Router));
  apiRouter.use(apiPath.TRANSACTIONS, initTransactions(Router));
  apiRouter.use(apiPath.EVENTS, initEvents(Router));
  apiRouter.use(apiPath.BETS, initBets(Router));
  apiRouter.use(apiPath.STATS, initStats(Router));

  return apiRouter;
};

module.exports = initApi;
