const createBetValidator = require("../../middlewares/validation/create-bet.middleware");
const createBetController = require('../../controllers/bets/create-bet.controller')

const initBets = (Router) => {
  const router = Router();

  router.post("/", createBetValidator,createBetController );

  return router;
};

module.exports = initBets;