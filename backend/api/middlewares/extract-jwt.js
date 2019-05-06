// imports
const jwt = require('jsonwebtoken');

// meus imports
const { JWT_SECRET, throwError } = require('./../utils/utils');
const db = require('./../models/dbConnection');

const extractJwtMiddleware = () => {

  return (req, res, next) => {

    let authorization = req.get('authorization');
    let token = authorization ? authorization.split(' ')[1] : undefined;

    req['context'] = {};
    req['context']['authorization'] = authorization;

    if ((!token)) { return next(); };

    // req['context']['authUser']

    jwt.verify(token, JWT_SECRET, (error, decoded) => {

      db.user
        .findByPk(decoded.sub)
        .then((userInstance) => {

          if (!!userInstance) {

            req['context']['authUser'] = {

              id: userInstance.id,
              email: userInstance.email,
              username: userInstance.username

            }

          }

          next();

        })

    });



  }

}

module.exports = extractJwtMiddleware;