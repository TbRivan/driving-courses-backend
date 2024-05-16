const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL edit_account(?, ?, ?)", [
      data.id,
      data.name,
      data.email,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Change Status Account: ${error}`);
    return false;
  }
};
