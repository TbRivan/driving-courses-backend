const procedure = require("../../procedure");
const validator = require("../../validator/order");
const httpResponse = require("../../helper/httpResponse");

module.exports = async (req, res) => {
  const data = {
    order_id: req.body.order_id,
    meet: req.body.meet,
  };
  const { error, value } = validator.editRemainingOrder(data);

  if (error) {
    return httpResponse(res, 400, error.details[0].message, null);
  }

  try {
    if (req.user.role !== 1) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }

    const editRemainingOrder = await procedure.editRemainingOrder(value);

    if (!editRemainingOrder) {
      return httpResponse(res, 400, "Gagal edit nilai untuk order ini", null);
    }

    return httpResponse(res, 200, "Sukses edit nilai untuk order ini", null);
  } catch (error) {
    return httpResponse(res, 500, error, null);
  }
};
