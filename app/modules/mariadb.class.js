"use strict";

const mysql = require("mysql");
const MyLogger = require("../helper/logger.class");

/**
 * @author stefanus adhie
 * @since 0.0.2
 * @see https://github.com/mysqljs/mysql
 * @version 2.18.1
 * @class MyMariaDB
 * @description
 * class for connect to database mariadb
 *
 * @constructor
 *
 * @param {string}  host The hostname of the database you are connecting to
 * @param {string}  port The port number to connect to
 * @param {string}  user The MySQL user to authenticate as
 * @param {string}  password  The password of that MySQL user
 * @param {string}  database Name of the database to use for this connection (Optional)
 */
class MyMariaDB extends MyLogger {
  constructor(host, port, user, password, database) {
    super(__filename);
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = database;
    this.connected = null;
    this.connection = null;
    this.count_reconnect = 0;
  }

  /**
   * @description
   * create pool connection
   *
   * @returns {function}
   */
  poolConnection() {
    return mysql.createPool({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
    });
  }

  /**
   * @description
   * test mariadb server connection
   *
   * @example
   * const MyMariaDB = require("./src/connection/mariadb.class");
   * const mariadb = new MyMariaDB(host, port, user, password, database);
   *
   * mariadb.ping();
   */
  ping() {
    return new Promise(async (resolve, reject) => {
      // mariadb pool connection
      this.poolConnection().getConnection((error, connection) => {
        // error connection
        if (error) {
          // console.log({error}, "mysql");
          // logger
          this.__log(__line, { message: error.message });
          return reject("internal server error");
        }

        connection.ping((error) => {
          // When done with the connection, release it.
          connection.destroy();

          // error ping
          if (error) {
            // logger
            this.__log(__line, { message: error.message });
            return reject(error.message);
          }

          // success
          return resolve("PONG");
        });
      });
    });
  }

  /**
   * @description
   * promise function for mariadb connection
   *
   * @returns {promises}
   *
   * @example
   * const MyMariaDB = require("./src/connection/mariadb.class");
   * const mariadb = new MyMariaDB(host, port, user, password, database);
   *
   * mariadb.query(query, data).then(result => {
   *   console.debug(result);
   * }).catch(error => {
   *   console.debug(error);
   * })
   */
  query_pool(query, data) {
    return new Promise(async (resolve, reject) => {
      // mariadb pool connection
      this.poolConnection().getConnection((error, connection) => {
        // error connection
        if (error) {
          // logger
          this.__log(__line, { message: error.message });
          return reject("internal server error");
        }

        connection.query(query, data, (error, result) => {
          // When done with the connection, destroy it.
          connection.destroy();

          // error query
          if (error) {
            // logger
            this.__log(__line, { message: error.message });
            return reject("data not found");
          }

          // success
          return resolve(result);
        });
      });
    });
  }

  createConnection() {
    const connection = mysql.createConnection({
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      database: this.database,
    });

    connection.connect(async (error) => {
      if (error) {
        this.connected = false;
        this.__warn(error.message); // logger
        return await this.reconnect();
      } else {
        // console.log("berhasil create connection");
        this.connected = true;
        this.count_reconnect = 0;
        this.__info(`mariadb connected database ${this.database}`); // logger
      }
    });

    connection.on("error", async (error) => {
      if (error) {
        this.connected = false;
        this.__log(__line, { message: error.message }); // logger
        return await this.reconnect();
      } else {
        this.connected = true;
        this.count_reconnect = 0;
        this.__log(__line, {
          message: `mariadb connected database ${this.database}`,
        }); // logger
      }
    });

    this.connection = connection;
    return connection;
  }

  reconnect() {
    setTimeout(async () => {
      this.count_reconnect = this.count_reconnect + 1;

      if (this.count_reconnect > 1000) {
        return console.log("PLEASE CHECK DATABASE CONNECTION");
      }

      await this.connection.destroy();
      return await this.createConnection();
    }, 3000);
  }

  query(query, data) {
    return new Promise(async (resolve, reject) => {
      if (this.connection) {
        this.connection.query(query, data, async (error, result) => {
          if (error) {
            this.__log(__line, { message: error.message }); // logger
            // reconnect database when get error "read ECONNRESET"
            if (
              error.message.match(/ECONNRESET/i) ||
              error.message.match(/Cannot enqueue Query after fatal error/i)
            ) {
              await this.reconnect();
            }

            return reject("data not found");
          } else {
            return resolve(result);
          }
        });
      } else {
        this.__log(__line, { message: "internal server error" }); // logger
        return reject("internal server error");
      }
    });
  }
}

module.exports = MyMariaDB;
