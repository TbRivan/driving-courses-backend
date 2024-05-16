const procedure = require("../../procedure");
const validator = require("../../validator/auth");
const httpResponse = require("../../helper/httpResponse");
const { hashPassword } = require("../../helper/hashing");

module.exports = async (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || 2,
  };
  const { error, value } = validator.createAccount(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    const findAccount = await procedure.findAccount({ email: value.email });

    if (findAccount === false) {
      return httpResponse(res, 400, "Failed create account", null);
    }

    if (findAccount) {
      return httpResponse(
        res,
        400,
        "Failed create account, email is taken",
        null
      );
    }

    value.password = `${hashPassword(value.password)}`;
    const createUser = await procedure.createAccount(value);

    if (!createUser) {
      return httpResponse(res, 400, "Failed create account", null);
    }

    return httpResponse(res, 200, "Success create account", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
