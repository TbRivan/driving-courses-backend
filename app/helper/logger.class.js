"use strict";

/**
 * @author stefanus adhie
 * @since 0.0.1
 * @class MyLogger
 * @description
 * class for logging
 *
 * @constructor
 *
 * @param {string} __filename
 */
class MyLogger {
  constructor(__filename) {
    this.filename = __filename;
  }

  /**
   * @param {string} line number of line
   * @param {string} message message description
   *
   * @returns {string}
   *
   * @example
   * const MyLogger = require("./src/helpers/logger.class");
   * const logger = new MyLogger(__filename);
   * logger.__error(__line, "message");
   */
  __error = (line, message) => {
    return console.error(
      new Date(),
      "[ERROR]",
      `${this.filename}:${line}`,
      JSON.stringify(message)
    );
  };

  /**
   * @param {string} message
   *
   * @returns {string}
   *
   * @example
   * const MyLogger = require("./src/helpers/logger.class");
   * const logger = new MyLogger(__filename);
   * logger.__warn("message");
   */
  __warn = (message) => {
    return console.warn(new Date(), "[WARNING]", JSON.stringify(message));
  };

  /**
   * @param {string} message
   *
   * @returns {string}
   *
   * @example
   * const MyLogger = require("./src/helpers/logger.class");
   * const logger = new MyLogger(__filename);
   * logger.__info("message");
   */
  __info = (message) => {
    return console.info(new Date(), "[INFO]", JSON.stringify(message));
  };

  /**
   * @param {string} line number of line
   * @param {string} message message description
   *
   * @returns {string}
   *
   * @example
   * const MyLogger = require("./src/helpers/logger.class");
   * const logger = new MyLogger(__filename);
   * logger.__log(__line, "message");
   */
  __log = (line, message) => {
    return console.log(
      JSON.stringify({
        datetime: new Date(),
        location: `${this.filename}:${line}`,
        message: message,
      })
    );
  };
}

module.exports = MyLogger;
