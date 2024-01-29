const createEventValidator = require("../../middlewares/validation/create-event.middleware");
const updateEventValidator = require("../../middlewares/validation/update-event.middleware");
const adminAuthorizationMiddleware = require("../../middlewares/authorization/admin-authorization.middleware");

const createEventsController = require("../../controllers/events/create-events.controller");
const putEventController = require("../../controllers/events/put-events.controller");

const initEvents = (Router) => {
  const router = new Router();

  router.post(
    "/",
    adminAuthorizationMiddleware,
    createEventValidator,
    createEventsController
  );

  router.put(
    "/:id",
    adminAuthorizationMiddleware,
    updateEventValidator,
    putEventController
  );

  return router;
};

module.exports = initEvents;
