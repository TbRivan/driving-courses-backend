const procedure = require("../../procedure");
const validator = require("../../validator/paket");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    id_package: req.body.id_package,
  };
  const { error, value } = validator.disablePackage(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const disablePackage = await procedure.disablePackage(value);

    if (!disablePackage) {
      return httpResponse(res, 400, "Gagal disable paket", null);
    }

    return httpResponse(res, 200, "Sukses disable paket", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
