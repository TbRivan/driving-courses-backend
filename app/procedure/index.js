module.exports = {
  // Auth
  createAccount: require("./auth/create_account"),
  findAccount: require("./auth/find_account"),
  findAccountById: require("./auth/find_account_by_id"),
  editAccount: require("./auth/edit_account"),
  changePassword: require("./auth/change_password"),
  changeStatusAccount: require("./auth/change_status_account"),

  // Package
  createPackage: require("./paket/create_package"),
  editPackage: require("./paket/edit_package"),
  disablePackage: require("./paket/disable_package"),

  // Order
  createOrder: require("./order/create_order"),
  editRemainingOrder: require("./order/edit_remaining_meet_admin"),
  disableOrder: require("./order/disable_order"),

  // course
  createCourse: require("./course/create_course"),
  changeStatusCourse: require("./course/change_status_course_by_admin"),
};
