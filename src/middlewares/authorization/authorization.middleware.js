const jwt = require("jsonwebtoken");

const authorizationMiddleware = (req, res, next) => {
  let tokenPayload;
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ error: "Not Authorized" });
  }

  token = token.replace("Bearer ", "");

  try {
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).send({ error: "Not Authorized" });
  }

  if (req.params.id) {
    if (req.params.id !== tokenPayload.id) {
      return res.status(401).send({ error: "UserId mismatch" });
    }
  }
  next();
};

module.exports = authorizationMiddleware;
