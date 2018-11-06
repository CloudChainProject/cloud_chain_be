const bcrypt = require('bcrypt');
const UsersSchema = require("../user/user.model.js");
const handlerError = require('../../helpers/').handlerError;

const getToken = async (req, res, next)=> {
  if(!req.body.User) return handlerError(req, res, 404, 'User not founded in body request');
  const user = req.body.User;
  let response = {}
  try {
    response = await sendToken(user);
  } catch (e) {
    return handlerError(req, res, e.status, e.message);
  }
  return res.status(201).send(response);
};



module.exports = {
  getToken: getToken
}


const sendToken = async(user)=>{
  return new Promise(async (resolve,reject)=>{
    const result = await UsersSchema.findOne({email: user.email, username:user.username }).select(['password', 'email', 'token', 'username']);
    if(result === null) return reject({'status':401, 'message':'Unauthorized'});
    if(bcrypt.compareSync(user.password, result.password)) {
      //TODO log
      return resolve({'_status': 'logged', 'token': result.token, 'id': result._id, 'type': 'user', 'name': result.username});
    } else {
      console.log('io');
      return reject({'status':401, 'message':'Unauthorized'});
    }
  })
}
