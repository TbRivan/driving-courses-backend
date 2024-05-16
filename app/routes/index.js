const controller = require("../controller");

module.exports = (app) => {
  // Auth
  app.post("/api/auth/create_account", controller.createAccount);
  app.post("/api/auth/login", controller.login);
};
