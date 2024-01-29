const joi = require("joi");

const createUserValidator = (req, res, next) => {
  try {
    const schema = joi
      .object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi
          .string()
          .pattern(/^\+?3?8?(0\d{9})$/)
          .required(),
        name: joi.string().required(),
        city: joi.string(),
      })
      .required();

    const isValidResult = schema.validate(req.body);
    if (isValidResult.error) {
      res.status(400).send({ error: isValidResult.error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = createUserValidator;
