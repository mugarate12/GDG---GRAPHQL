const authController = (context) => {

  if (context.authorization) return true

  throw new Error('token not provided');


}

module.exports = authController;