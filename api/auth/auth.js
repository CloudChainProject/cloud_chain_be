const User = require('../user/user.model.js');
const LoggerAuthSchema = require('./log_auth.model.js');
module.exports = {
  check: async (req, res, next) => {
    var obj = {
      asin: req.params.asin,
      country: req.params.country,
      branch: req.url
    }
    var log = new LoggerAuthSchema(obj)
    let result = await log.save();
    if(req.path.indexOf('api/v') === -1)return await next();
    if(req.path.indexOf('api/v1/login') > -1)return await next();
    if(req.path.indexOf('web') > -1)return await next();
    if(!req.headers.authorization) return message(req, res, next)
    var x = await User.find({'token':  req.headers.authorization.slice(-15)})
    if(x.length === 0 ) return message(req, res, next)
    await next();
  }
};

function message(req, res, next){
  console.log('authjs');
  console.log(req.url);
  console.log(req.headers.host);
  console.log(req.headers.authorization);
  return res.status(401).send({'message': 'unauthorized'});
}
