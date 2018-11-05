var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
   username: {type : String, required: true},
   email: {type : String, required: true},
   token: {type : String, required: true},
   password: {type : String, required: true},
   createdAt: {type: Date, default: Date.now}
});

var User = mongoose.model("User", userSchema);
module.exports = User;
