const userService = require("../../services/user.service");
const transactionService = require("../../services/transaction.service");
const transformProps = require("../../helpers/transform-props");
const toSnakeCase = require('../../helpers/to-snake-case')

const createTransactionController = async (req, res) => {
  const user = await userService.getUserById(req.body.userId);
  if (!user) {
    res.status(400).send({ error: "User does not exist" });
    return;
  }
  toSnakeCase(req.body)

  transactionService
    .createTransaction(req.body)
    .then(([result]) => {
      const currentBalance = req.body.amount + user.balance;
      userService
        .updateUserBalance(req.body.user_id, currentBalance)
        .then(() => {
          transformProps(
            ["user_id", "card_number", "created_at", "updated_at"],
            result
          );

          return res.send({
            ...result,
            currentBalance,
          });
        });
    })
    .catch(() => {
      res.status(500).send("Internal Server Error");
      return;
    });
};

module.exports = createTransactionController;
