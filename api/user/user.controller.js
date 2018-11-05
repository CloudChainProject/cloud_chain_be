const UsersSchema = require("./user.model.js");

const get_info = async (req, res, next)=> {

  if(!req.params.id) return handlerError(req, res, 404, 'User not founded in body request');
  const id = req.params.id;
  let response = {}
  try {
    response = await get_info_logic(id);
  } catch (e) {
    return handlerError(req, res, e.status, e.message);
  }
  return res.status(201).send(response);

};

module.exports = {
  get_info: get_info
}


const get_info_logic = async(id)=>{
  return new Promise(async(resolve,reject)=>{
    let result = await UsersSchema.findOne({_id: req.params.id }).select(['-password', '-token']);
    if(result === null) return reject({'status': 401, 'message':'User not found'});
    return resolve({'status': 200, 'message':'created', '_id': result._id});
  })
}
