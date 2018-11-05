var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var signupSchema = new Schema({
   username:     {type: String, require: true},
   mail:     {type: String, require: true},
   password: {type: String, require: true},
   createAt: {type: Date, default: date.now}
});

var Signup = mongoose.model("Signup", signupSchema);
module.exports = Signup;
