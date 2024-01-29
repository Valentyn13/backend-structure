const joi = require("joi");

const updateUserValidator = (req, res, next) => {
  try {
    var schema = joi
      .object({
        email: joi.string().email(),
        phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
        name: joi.string(),
        city: joi.string(),
      })
      .required();

    var isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
      res.status(400).send({ error: isValidResult.error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = updateUserValidator;
