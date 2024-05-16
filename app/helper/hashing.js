const bcrypt = require("bcrypt");

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  checkPassword: (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
  },
};
