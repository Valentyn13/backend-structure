const jwt = require("jsonwebtoken");
const stats = require('../../common/constants/constants')

const initStats = (Router) => {
    const router = new Router()

    router.get('/',(req, res) => {
        try {
          var ak = 'authorization';
          let token = req.headers[ak];
          if(!token) {
            return res.status(401).send({ error: 'Not Authorized' });
          }
          token = token.replace('Bearer ', '');
          try {
            var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
            if (tokenPayload.type != 'admin') {
              throw new Error();
            }
          } catch (err) {
            return res.status(401).send({ error: 'Not Authorized' });
          }
          res.send(stats);
        } catch (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
          return;
        }
      })

    return router
}

module.exports = initStats