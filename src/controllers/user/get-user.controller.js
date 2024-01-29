const userService = require("../../services/user.service");

const getUserController = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }
    return res.send({
      ...user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = getUserController;
