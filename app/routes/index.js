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
};
