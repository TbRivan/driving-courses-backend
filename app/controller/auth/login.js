const procedure = require("../../procedure");
const validator = require("../../validator/auth");
const httpResponse = require("../../helper/httpResponse");
const { checkPassword } = require("../../helper/hashing");
const { signJwt } = require("../../helper/jwt");

module.exports = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  const { error, value } = validator.login(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    const account = await procedure.findAccount({ email: value.email });

    if (!account) {
      return httpResponse(
        res,
        400,
        "Email atau password yang anda masukkan salah",
        null
      );
    }

    if (account.status === 0) {
      return httpResponse(res, 400, "Akun anda sudah tidak aktif", null);
    }

    const comparePassword = checkPassword(value.password, account.password);

    if (!comparePassword) {
      return httpResponse(
        res,
        400,
        "Email atau password yang anda masukkan salah",
        null
      );
    }

    delete account.password;

    const token = signJwt({ ...account });

    return httpResponse(res, 200, "Berhasil login", token);
  } catch (error) {
    console.log(error);
    return httpResponse(res, 500, error, null);
  }
};
