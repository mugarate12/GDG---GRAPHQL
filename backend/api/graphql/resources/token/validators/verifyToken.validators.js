// imports
const jwt = require('jsonwebtoken');

// meus imports
const {
  JWT_SECRET,
  throwError
} = require('./../../../../utils/utils');

const verifyToken = (context) => {

  if (context.authUser){

    return true

  } else if (context.authorization) {

    let token = context.authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, decoded) => {

      return true

    })

  } 

  throw new Error('token not valid');

}

module.exports = verifyToken;