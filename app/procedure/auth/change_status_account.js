const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    const res = await mariadb.query("CALL change_status_account(?, ?)", [
      data.id,
      data.status,
    ]);

    if (res.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`Failed Change Status Account: ${error}`);
    return false;
  }
};
