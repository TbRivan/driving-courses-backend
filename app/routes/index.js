const controller = require("../controller");
const middleware = require("../middleware/auth");

module.exports = (app) => {
  // Auth
  app.post("/api/auth/create-account", controller.createAccount);
  app.post("/api/auth/login", controller.login);
  app.post(
    "/api/auth/edit-account",
    middleware.authorization,
    controller.editAccount
  );
  app.post(
    "/api/auth/change-password",
    middleware.authorization,
    controller.changePassword
  );
  app.post(
    "/api/auth/change-status-account",
    middleware.authorization,
    controller.changeStatusAccount
  );

  // Package
  app.post(
    "/api/package/create-package",
    middleware.authorization,
    controller.createPackage
  );
  app.post(
    "/api/package/edit-package",
    middleware.authorization,
    controller.editPackage
  );
  app.post(
    "/api/package/disable-package",
    middleware.authorization,
    controller.disablePackage
  );

  // Order
  app.post(
    "/api/order/create-order",
    middleware.authorization,
    controller.createOrder
  );
  app.post(
    "/api/order/edit-remain-order",
    middleware.authorization,
    controller.editRemainOrder
  );
  app.post(
    "/api/order/disable-order",
    middleware.authorization,
    controller.disableOrder
  );
};
