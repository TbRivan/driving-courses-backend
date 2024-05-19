const procedure = require("../../procedure");
const validator = require("../../validator/order");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    account_id: req.body.account_id,
    package_id: req.body.package_id,
  };
  const { error, value } = validator.createOrder(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const createOrder = await procedure.createOrder(value);

    if (!createOrder) {
      return httpResponse(res, 400, "Gagal membuat order", null);
    }

    return httpResponse(res, 200, "Sukses membuat order", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
