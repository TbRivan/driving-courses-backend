const { verifyJwt } = require("../helper/jwt");
const procedure = require("../procedure");
const httpResponse = require("../helper/httpResponse");

module.exports = {
  authorization: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const data = verifyJwt(token);

      if (!data.valid) {
        throw new Error();
      }

      const user = await procedure.findAccountById(data.decoded);

      if (!user) {
        throw new Error();
      }

      req.user = data.decoded;
      req.token = token;

      next();
    } catch (error) {
      httpResponse(res, 401, "Kamu tidak punya akses ke resource ini!", null);
    }
  },
};
