const userService = require('../../services/user.service')
const transactionService = require('../../services/transaction.service')
const transformProps = require('../../helpers/transform-props')
const createTransactionController = async (req, res) =>{
    const user = await userService.getUserById(req.body.userId)
    if(!user) {
        res.status(400).send({ error: 'User does not exist'});
        return;
    }
    req.body.card_number = req.body.cardNumber;
    delete req.body.cardNumber;
    req.body.user_id = req.body.userId;
    delete req.body.userId;

    transactionService.createTransaction(req.body).then(([result]) =>{
      console.log(result)
        const currentBalance = req.body.amount + user.balance;
        userService.updateUserBalance(req.body.user_id, currentBalance).then(() => {
          transformProps(['user_id', 'card_number', 'created_at', 'updated_at'],result)

            return res.send({ 
              ...result,
              currentBalance,
            });
          });
    }).catch(
        err => {
            console.log(err)
          res.status(500).send("Internal Server Error");
          return;
        }
    )
}

module.exports = createTransactionController