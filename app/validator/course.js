const Joi = require("joi");

module.exports = {
  createCourse: (data) => {
    const schema = Joi.object({
      order_id: Joi.number().required(),
      course_time: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8, 9).required(),
      course_date: Joi.date().iso().required().messages({
        "date.base": `"date" should be a valid date`,
        "date.format": `"date" should be in ISO format (YYYY-MM-DD)`,
      }),
    });

    return schema.validate(data);
  },
  changeStatusCourse: (data) => {
    const schema = Joi.object({
      course_id: Joi.number().required(),
      status_course: Joi.number().valid(0, 1).required(),
    });

    return schema.validate(data);
  },
};
