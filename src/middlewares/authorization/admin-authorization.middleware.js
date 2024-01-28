const jwt = require("jsonwebtoken");

const adminAuthorizationMiddleware = (req, res, next) => {
  let tokenPayload;
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ error: "Not Authorized" });
  }

  token = token.replace("Bearer ", "");

  tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

  if (tokenPayload.type != "admin") {
    return res.status(401).send({ error: "Not Authorized" });
  }
  next();
};


module.exports = adminAuthorizationMiddleware