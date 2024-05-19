const procedure = require("../../procedure");
const validator = require("../../validator/paket");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    id_package: req.body.id_package,
    name_package: req.body.name_package,
    description: req.body.description,
    time_package: req.body.time_package,
    type_car: req.body.type_car,
    price: req.body.price,
    updatedBy: req.user.id,
  };
  const { error, value } = validator.editPackage(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const editPackage = await procedure.editPackage(value);

    if (!editPackage) {
      return httpResponse(res, 400, "Gagal edit paket", null);
    }

    return httpResponse(res, 200, "Sukses edit paket", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
