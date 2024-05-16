const procedure = require("../../procedure");
const validator = require("../../validator/auth");
const httpResponse = require("../../helper/httpResponse");
const { checkPassword, hashPassword } = require("../../helper/hashing");

module.exports = async (req, res) => {
  const data = {
    id: req.user.id,
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  };
  const { error, value } = validator.changePassword(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    const account = await procedure.findAccountById(req.user);

    if (!account) {
      return httpResponse(res, 400, "Akun tidak ditemukan", null);
    }

    const comparePassword = checkPassword(value.oldPassword, account.password);

    if (!comparePassword) {
      return httpResponse(res, 400, "Password yang dimasukkan salah", null);
    }

    value.password = `${hashPassword(value.newPassword)}`;

    const changePassword = await procedure.changePassword(value);

    if (!changePassword) {
      return httpResponse(res, 400, "Gagal mengganti password", null);
    }

    return httpResponse(res, 200, "Berhasil mengganti password", null);
  } catch (error) {
    console.log(error);
    return httpResponse(res, 500, error, null);
  }
};
