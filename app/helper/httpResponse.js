module.exports = (res, statusCode, message, data) => {
  return res
    .status(statusCode)
    .send({ headers: { statusCode, message }, data });
};
