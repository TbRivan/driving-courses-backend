const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL edit_remaining_meet_admin(?, ?)", [
      data.order_id,
      data.meet,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Edit meet order: ${error}`);
    return false;
  }
};
