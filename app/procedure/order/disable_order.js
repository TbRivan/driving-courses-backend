const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL disable_order(?)", [data.order_id]);

    return true;
  } catch (error) {
    console.log(`Failed disable order: ${error}`);
    return false;
  }
};
