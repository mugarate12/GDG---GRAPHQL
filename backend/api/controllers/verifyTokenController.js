// imports
const jwt = require('jsonwebtoken');

// meus imports
const {
  JWT_SECRET,
  throwError
} = require('./../utils/utils');

const verifyTokenController = (context) => {

  if (context.authUser){

    return true

  } else if (context.authorization) {

    let token = context.authorization.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (error, decoded) => {

      if (decoded) { return true };
      throwError(error, 'token invalid');

    });

  } 


}

module.exports = verifyTokenController;