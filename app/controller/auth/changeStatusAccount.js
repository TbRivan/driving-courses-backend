const procedure = require("../../procedure");
const validator = require("../../validator/auth");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    id: req.body.id,
    status: req.body.status,
  };
  const { error, value } = validator.changeStatusAccount(data);

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

    const changeStatus = await procedure.changeStatusAccount(value);

    if (!changeStatus) {
      return httpResponse(res, 400, "Gagal update status akun", null);
    }

    return httpResponse(res, 200, "Berhasil update status akun", null);
  } catch (error) {
    console.log(error);
    return httpResponse(res, 500, error, null);
  }
};
