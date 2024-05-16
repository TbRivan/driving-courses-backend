const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL create_account(?, ?, ?, ?)", [
      data.name,
      data.role,
      data.email,
      data.password,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Create Account: ${error}`);
    return false;
  }
};
