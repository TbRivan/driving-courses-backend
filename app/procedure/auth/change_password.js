const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL change_password(?, ?)", [data.id, data.password]);

    return true;
  } catch (error) {
    console.log(`Failed Change Password Account: ${error}`);
    return false;
  }
};
