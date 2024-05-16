const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

module.exports = {
  signJwt: (payload) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
  },

  verifyJwt: (token) => {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      return {
        valid: true,
        expired: false,
        decoded,
      };
    } catch (error) {
      return {
        valid: false,
        expired: error.message === `jwt is expired or not eligible to use`,
        decoded: null,
      };
    }
  },
};
