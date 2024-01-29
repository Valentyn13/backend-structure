const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "" } = err;
  res.status(status).send({ status, message });
};

module.exports = errorHandler;
