const joi = require("joi");

const getUserByIdValidator = (req, res, next) => {
  try {
    const schema = joi
      .object({
        id: joi.string().uuid(),
      })
      .required();

    const isValidResult = schema.validate(req.params);

    if (isValidResult.error) {
      res.status(400).send({ error: isValidResult.error.details[0].message });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = getUserByIdValidator;
