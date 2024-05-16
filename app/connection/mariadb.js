const MyMariaDB = require("../modules/mariadb.class");
const config = require("../config").mysql;

const mariadb_settings = new MyMariaDB(
  config.host,
  config.port,
  config.user,
  config.password,
  config.database
);

module.exports = mariadb_settings;
