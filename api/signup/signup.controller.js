const bcrypt = require('bcrypt');
const UsersSchema = require("../user/user.model.js");
const handlerError = require('../../helpers/').handlerError;

var new_user = async (req, res, next)=> {
  if(!req.body.User) return handlerError(req, res, 404, 'User not founded in body request');
  const user = req.body.User;
  let response = {}
  try {
    response = await new_user_logic(user);
  } catch (e) {
    return handlerError(req, res, e.status, e.message);
  }
  return res.status(201).send(response);
}

module.exports = {
  new_user: new_user
}

const new_user_logic = async (user) => {
  return new Promise(async(resolve, reject)=>{
    let check = await  UsersSchema.findOne({$or:[{email: user.email}, {name:user.name}]}).select({mail:1, name:1});
    if(check !== null) return reject({'status': 400, 'message':'email or name already taken'})
    let possible = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    let token ='';
    for (var i = 0; i < 25; i++) { token += possible.charAt(Math.floor(Math.random() * possible.length));};
    user.token = token;
    user.password = await bcrypt.hashSync(user.password, 10);
    try {
      const user_check = new UsersSchema(user)
      const result = await user_check.save();
      //TODO log sign up
      return resolve({'status': 201, 'message':'created', '_id': result._id})
    } catch (e) {
      return reject({'status': 400, 'message':e})
    }
  });
}
