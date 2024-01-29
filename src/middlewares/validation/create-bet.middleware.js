const joi = require("joi");

const createBetValidator = (req, res, next) => {
  const schema = joi
    .object({
      id: joi.string().uuid(),
      eventId: joi.string().uuid().required(),
      betAmount: joi.number().min(1).required(),
      prediction: joi.string().valid("w1", "w2", "x").required(),
    })
    .required();
  const isValidResult = schema.validate(req.body);
  if (isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  }
  next();
};

module.exports = createBetValidator;
