const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL disable_package(?)", [data.id_package]);

    return true;
  } catch (error) {
    console.log(`Failed Disable Package: ${error}`);
    return false;
  }
};
