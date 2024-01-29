const jwt = require("jsonwebtoken");

const getIdFromToken = (signature) => {
  const token = signature.replace("Bearer ", "");
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  const userId = tokenPayload.id;
  return userId;
};

module.exports = getIdFromToken;
