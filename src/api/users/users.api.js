const getUserByIdValidator = require("../../middlewares/validation/get-user-by-id.middleware");
const createUserValidator = require("../../middlewares/validation/create-user.middleware");
const updateUserValidator = require("../../middlewares/validation/update-user.middleware");

const getUserController = require("../../controllers/user/get-user.controller");
const createUserController = require("../../controllers/user/create-user.controller");
const updateUserController = require("../../controllers/user/update-user.controller");

const authorizationMiddleware = require("../../middlewares/authorization/authorization.middleware");

const initUsers = (Router) => {
  const router = new Router();

  router.get("/:id", getUserByIdValidator, getUserController);
  router.post("/", createUserValidator, createUserController);
  router.put(
    "/:id",
    authorizationMiddleware,
    updateUserValidator,
    updateUserController
  );

  return router;
};

module.exports = initUsers;
