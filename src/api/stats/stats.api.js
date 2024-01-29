const stats = require("../../common/constants/constants");

const adminAuthorizationMiddleware = require("../../middlewares/authorization/admin-authorization.middleware");

const initStats = (Router) => {
  const router = new Router();

  router.get("/", adminAuthorizationMiddleware, (req, res) => {
    res.send(stats);
  });

  return router;
};

module.exports = initStats;
