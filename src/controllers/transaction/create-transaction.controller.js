const userService = require('../../services/user.service')
const transactionService = require('../../services/transaction.service')

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
        const currentBalance = req.body.amount + user.balance;
        userService.updateUserBalance(req.body.user_id, currentBalance).then(() => {
            ['user_id', 'card_number', 'created_at', 'updated_at'].forEach(whatakey => {
              var index = whatakey.indexOf('_');
              var newKey = whatakey.replace('_', '');
              newKey = newKey.split('')
              newKey[index] = newKey[index].toUpperCase();
              newKey = newKey.join('');
              result[newKey] = result[whatakey];
              delete result[whatakey];
            })
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