const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL change_status_account(?, ?)", [
      data.id,
      data.status,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Change Status Account: ${error}`);
    return false;
  }
};
