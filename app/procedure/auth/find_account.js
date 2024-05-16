const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    const res = await mariadb.query("CALL find_account(?)", [data.email]);

    return res[0][0];
  } catch (error) {
    console.log(`Failed Find Account: ${error}`);
    return false;
  }
};
