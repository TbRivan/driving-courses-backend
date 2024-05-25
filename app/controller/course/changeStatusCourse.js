const procedure = require("../../procedure");
const validator = require("../../validator/course");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    course_id: req.body.course_id,
    status_course: req.body.status_course,
  };
  const { error, value } = validator.changeStatusCourse(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      return httpResponse(
        res,
        401,
        "Kamu tidak punya akses ke resource ini!",
        null
      );
    }

    const acceptAdmin = await procedure.changeStatusCourse(value);

    if (acceptAdmin === false) {
      return httpResponse(res, 400, "Gagal update latihan", null);
    }

    return httpResponse(res, 200, "Sukses update latihan", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
