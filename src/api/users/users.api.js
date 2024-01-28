const joi = require('joi');
const db = require('../../data/connection')
const jwt = require("jsonwebtoken");
const statEmitter = require('../../socket/connection')

const getUserByIdValidator = require('../../middlewares/validation/get-user-by-id.middleware')
const createUserValidator = require('../../middlewares/validation/create-user.middleware')
const authorizationMiddleware = require('../../middlewares/authorization/authorization.middleware')
const updateUserValidator = require('../../middlewares/validation/update-user.middleware')

const initUsers = (Router) => {
    const router = new Router()

    router.get('/:id', getUserByIdValidator,(req, res) => {
        try {
          db("user").where('id', req.params.id).returning("*").then(([result]) => {
            if(!result) {
              res.status(404).send({ error: 'User not found'});
              return;
            }
            return res.send({ 
              ...result,
            });
          });
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
      })



      router.post('/',createUserValidator,(req, res) => {

        req.body.balance = 0;
        db("user").insert(req.body).returning("*").then(([result]) => {
            
          result.createdAt = result.created_at;
          delete result.created_at;
          result.updatedAt = result.updated_at;
          delete result.updated_at;
          statEmitter.emit('newUser');
          
          return res.send({ 
            ...result,
            accessToken: jwt.sign({ id: result.id, type: result.type }, process.env.JWT_SECRET)
          });
        }).catch(err => {
            console.log('Enter:',err)
          if(err.code == '23505') {
            res.status(400).send({
              error: err.detail
            });
            return;
          }
          res.status(500).send("Internal Server Error");
          return;
        });
      })

      router.put('/:id',authorizationMiddleware, updateUserValidator,(req, res) => {

        db("user").where('id', req.params.id).update(req.body).returning("*").then(([result]) => {
          return res.send({ 
            ...result,
          });
        }).catch(err => {
          if(err.code == '23505') {
            console.log(err);
            res.status(400).send({
              error: err.detail
            });
            return;
          }
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        });
      })

    return router
}

module.exports = initUsers