const procedure = require("../../procedure");
const validator = require("../../validator/order");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    order_id: req.body.order_id,
  };
  const { error, value } = validator.disableOrder(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const disableOrder = await procedure.disableOrder(value);

    if (!disableOrder) {
      return httpResponse(res, 400, "Gagal disable order", null);
    }

    return httpResponse(res, 200, "Sukses disable order", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
