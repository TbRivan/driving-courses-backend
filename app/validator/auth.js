const Joi = require("joi");

module.exports = {
  createAccount: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(8).required(),
      role: Joi.number().allow("", null),
    });

    return schema.validate(data);
  },
  login: (data) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(8).required(),
    });

    return schema.validate(data);
  },
  editAccount: (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().allow("", null),
    });

    return schema.validate(data);
  },
  changePassword: (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      oldPassword: Joi.string().min(8).required(),
      newPassword: Joi.string().min(8).required(),
    });

    return schema.validate(data);
  },
  changeStatusAccount: (data) => {
    const schema = Joi.object({
      id: Joi.number().required(),
      status: Joi.number().valid(0, 1).required(),
    });

    return schema.validate(data);
  },
};
