// imports
const jwt = require('jsonwebtoken');

// meus imports
const { JWT_SECRET } = require('./../../../utils/utils');

const createtoken = (id) => {
  
  const payload = {

    sub: id

  }

  return {

    token: jwt.sign(payload, JWT_SECRET)

  }

}

module.exports = createtoken;