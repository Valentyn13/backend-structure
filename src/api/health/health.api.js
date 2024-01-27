const apiPath = require("../../common/enums/api-path.enum");

const initHealth = (Router) => {
  const router = new Router();
  router.get('/', (req, res) => {
    res.send("Hello World!");
  });
  return router
};

module.exports = initHealth