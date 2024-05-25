const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL change_status_course_by_admin(?, ?)", [
      data.course_id,
      data.status_course,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed change status: ${error}`);
    return false;
  }
};
