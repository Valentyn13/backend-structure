const userService = require("../../services/user.service");

const updateUserController = (req, res) => {
  userService
    .updateUser(req.params.id, req.body)
    .then(([result]) => {
      return res.send({
        ...result,
      });
    })
    .catch((err) => {
      if (err.code == "23505") {
        res.status(400).send({
          error: err.detail,
        });
        return;
      }
      res.status(500).send("Internal Server Error");
      return;
    });
};

module.exports = updateUserController;
