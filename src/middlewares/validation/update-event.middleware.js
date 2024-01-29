const joi = require("joi");

const updateEventValidator = (req, res, next) => {
  const schema = joi
    .object({
      score: joi.string().required(),
    })
    .required();
  const isValidResult = schema.validate(req.body);
  if (isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  }

  next();
};

module.exports = updateEventValidator;
