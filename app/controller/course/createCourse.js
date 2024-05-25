const procedure = require("../../procedure");
const validator = require("../../validator/course");
const httpResponse = require("../../helper/httpResponse");
const { verifyDate } = require("../../helper/date");

module.exports = (io) => {
  return async (req, res) => {
    const data = {
      order_id: req.body.order_id,
      course_time: req.body.course_time,
      course_date: req.body.course_date,
    };
    const { error, value } = validator.createCourse(data);

    if (error) {
      return httpResponse(res, 400, error.details[0].message, null);
    }

    try {
      const checkDate = verifyDate(value.course_date);

      if (!checkDate) {
        return httpResponse(
          res,
          400,
          "Maaf, anda tidak bisa booking latihan pada hari ini",
          null
        );
      }

      const createCourse = await procedure.createCourse(value);

      if (createCourse === false) {
        return httpResponse(res, 400, "Gagal booking latihan", null);
      }

      io.emit("admin", "Ada permintaan latihan baru!");

      return httpResponse(res, 200, "Sukses membooking latihan", null);
    } catch (error) {
      console.log(error);
      return httpResponse(res, 500, error, null);
    }
  };
};
