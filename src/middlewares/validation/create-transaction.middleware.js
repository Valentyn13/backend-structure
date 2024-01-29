const joi = require("joi");

const createTransactionValidator = (req, res, next) => {
  const schema = joi
    .object({
      id: joi.string().uuid(),
      userId: joi.string().uuid().required(),
      cardNumber: joi.string().required(),
      amount: joi.number().min(0).required(),
    })
    .required();
  const isValidResult = schema.validate(req.body);
  if (isValidResult.error) {
    res.status(400).send({ error: isValidResult.error.details[0].message });
    return;
  }
  next();
};

module.exports = createTransactionValidator;
