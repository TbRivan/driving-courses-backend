const procedure = require("../../procedure");
const validator = require("../../validator/auth");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    id: req.user.id,
    name: req.body.name,
  };
  const { error, value } = validator.editAccount(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    const account = await procedure.editAccount(value);

    if (!account) {
      return httpResponse(res, 400, "Gagal edit akun", null);
    }

    return httpResponse(res, 200, "Berhasil edit akun", null);
  } catch (error) {
    console.log(error);
    return httpResponse(res, 500, error, null);
  }
};
