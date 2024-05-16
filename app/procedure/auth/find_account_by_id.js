const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    const res = await mariadb.query("CALL find_account_by_id(?)", [data.id]);

    return res[0][0];
  } catch (error) {
    console.log(`Failed Find Account: ${error}`);
    return false;
  }
};
