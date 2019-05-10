const cors = () => {
  
  return (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    // res.setHeader('Access-Control-Allow-Headers', 'content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();

  }

}

module.exports = cors;