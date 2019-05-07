// meus imports
const authController = require('./authController');
const verifyTokenController = require('./verifyTokenController');

const ValidateTokenController = (context) => {

  authController(context);
  verifyTokenController(context);

}

module.exports = {

  ValidateTokenController

}