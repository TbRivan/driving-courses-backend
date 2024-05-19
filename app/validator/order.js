const Joi = require("joi");

module.exports = {
  createOrder: (data) => {
    const schema = Joi.object({
      account_id: Joi.number().required(),
      package_id: Joi.number().required(),
    });

    return schema.validate(data);
  },
  editRemainingOrder: (data) => {
    const schema = Joi.object({
      order_id: Joi.number().required(),
      meet: Joi.number().required(),
    });

    return schema.validate(data);
  },
  disableOrder: (data) => {
    const schema = Joi.object({
      order_id: Joi.number().required(),
    });

    return schema.validate(data);
  },
};
