const mariadb = require("../../connection/mariadb");

module.exports = async (data) => {
  try {
    await mariadb.query("CALL create_courses_by_account(?, ?, ?)", [
      data.order_id,
      data.course_time,
      data.course_date,
    ]);

    return true;
  } catch (error) {
    console.log(`Failed Create course: ${error}`);
    return false;
  }
};
