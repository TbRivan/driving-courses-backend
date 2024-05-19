const procedure = require("../../procedure");
const validator = require("../../validator/paket");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    name_package: req.body.name_package,
    description: req.body.description,
    time_package: req.body.time_package,
    type_car: req.body.type_car,
    price: req.body.price,
    createdBy: req.user.id,
  };
  const { error, value } = validator.createPackage(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const createPackage = await procedure.createPackage(value);

    if (!createPackage) {
      return httpResponse(res, 400, "Gagal membuat paket", null);
    }

    return httpResponse(res, 200, "Sukses membuat paket", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
