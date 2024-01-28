const jwt = require("jsonwebtoken");

const adminAuthorizationMiddleware = (req, res, next) => {
  let tokenPayload;
  let token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(401).send({ error: "Not Authorized" });
    }
  
    token = token.replace("Bearer ", "");
  
    tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  
    if (tokenPayload.type != "admin") {
      return res.status(401).send({ error: "Not Authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return;
  }

};


module.exports = adminAuthorizationMiddleware