module.exports = {
  // Auth
  createAccount: require("./auth/create_account"),
  findAccount: require("./auth/find_account"),
  findAccountById: require("./auth/find_account_by_id"),
  editAccount: require("./auth/edit_account"),
  changePassword: require("./auth/change_password"),
  changeStatusAccount: require("./auth/change_status_account"),
};
