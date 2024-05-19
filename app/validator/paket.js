const Joi = require("joi");

module.exports = {
  createPackage: (data) => {
    const schema = Joi.object({
      name_package: Joi.string().required(),
      description: Joi.string().required(),
      time_package: Joi.number().required(),
      type_car: Joi.string().required(),
      price: Joi.number().required(),
      createdBy: Joi.number().required(),
    });

    return schema.validate(data);
  },
  editPackage: (data) => {
    const schema = Joi.object({
      id_package: Joi.number().required(),
      name_package: Joi.string().required(),
      description: Joi.string().required(),
      time_package: Joi.number().required(),
      type_car: Joi.string().required(),
      price: Joi.number().required(),
      updatedBy: Joi.number().required(),
    });

    return schema.validate(data);
  },
  disablePackage: (data) => {
    const schema = Joi.object({
      id_package: Joi.number().required(),
    });

    return schema.validate(data);
  },
};
