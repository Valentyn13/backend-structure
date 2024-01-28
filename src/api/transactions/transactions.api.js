const createTransactionValidator = require('../../middlewares/validation/create-transaction.middleware')
const adminAuthorizationMiddleware = require('../../middlewares/authorization/admin-authorization.middleware')
const createTransactionController = require('../../controllers/transaction/create-transaction.controller')

const initTransactions = (Router) => {
  const router  = Router()

  router.post('/',createTransactionValidator, adminAuthorizationMiddleware,createTransactionController)
    
  return router
}

module.exports = initTransactions