const joi = require('joi');

const createEventValidator = (req,res,next) => {
    const schema = joi.object({
        id: joi.string().uuid(),
        type: joi.string().required(),
        homeTeam: joi.string().required(),
        awayTeam: joi.string().required(),
        startAt: joi.date().required(),
        odds: joi.object({
          homeWin: joi.number().min(1.01).required(),
          awayWin: joi.number().min(1.01).required(),
          draw: joi.number().min(1.01).required(),
        }).required(),
      }).required();
      const isValidResult = schema.validate(req.body);
      if(isValidResult.error) {
        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
      };
      next()
}

module.exports = createEventValidator