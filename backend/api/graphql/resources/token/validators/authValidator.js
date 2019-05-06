// meus imports
const { throwError } = require('./../../../../utils/utils');

const auth = (context) => {

  if (context.authorization) return true

  throw new Error('token not provided');


}

module.exports = auth;