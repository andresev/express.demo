const logging = (req, res, next) => {
  console.log('logging...');
  next(); //used to continue middleware pipeline
};

module.exports = logging;
