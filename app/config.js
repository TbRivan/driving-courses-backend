const ENV = process.env;

module.exports = {
  port: ENV.NODE_PORT,
  ip: ENV.NODE_IP,

  mysql: {
    host: ENV.MYSQL_HOST,
    port: ENV.MYSQL_PORT,
    user: ENV.MYSQL_USER,
    password: ENV.MYSQL_PASSWORD,
    database: ENV.MYSQL_DATABASE,
  },

  jwtSecret: ENV.JWT_SECRET,
};
