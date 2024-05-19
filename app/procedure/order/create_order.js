const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL create_order(?, ?)", [
      data.account_id,
      data.package_id,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Create order: ${error}`);
    return false;
  }
};
