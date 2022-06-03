const authentication = (req, res, next) => {
  console.log('Authenticating...');
  next(); //used to continue middleware pipeline
};

module.exports = authentication;
