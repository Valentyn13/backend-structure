const jwt = require("jsonwebtoken");

const userService = require("../../services/user.service");

const createUserController = async (req, res) => {
  try {
    req.body.balance = 0;
    const user = await userService.createUser(req.body);

    return res.send({
      ...user,
      accessToken: jwt.sign(
        { id: user.id, type: user.type },
        process.env.JWT_SECRET
      ),
    });
  } catch (error) {
    if (error.code == "23505") {
      res.status(400).send({
        error: error.detail,
      });
      return;
    }
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = createUserController;
