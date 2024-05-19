module.exports = {
  // Auth
  createAccount: require("./auth/createAccount"),
  login: require("./auth/login"),
  editAccount: require("./auth/editAccount"),
  changePassword: require("./auth/changePassword"),
  changeStatusAccount: require("./auth/changeStatusAccount"),

  // Package
  createPackage: require("./paket/createPackage"),
  editPackage: require("./paket/editPackage"),
  disablePackage: require("./paket/disablePackage"),

  // Order
  createOrder: require("./order/createOrder"),
  disableOrder: require("./order/disableOrder"),
  editRemainOrder: require("./order/editRemainOrder"),
};
