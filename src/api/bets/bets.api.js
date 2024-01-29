const createBetValidator = require("../../middlewares/validation/create-bet.middleware");
const createBetController = require('../../controllers/bets/create-bet.controller');
const authorizationMiddleware = require("../../middlewares/authorization/authorization.middleware");



const initBets = (Router) => {
  const router = Router();

  router.post("/", authorizationMiddleware,createBetValidator,createBetController );

  return router;
};

module.exports = initBets;