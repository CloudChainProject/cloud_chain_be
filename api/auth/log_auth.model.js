var mongoose = require ("mongoose");
var ObjectId  = mongoose.Schema.Types.ObjectId;

var Schema = mongoose.Schema;
var logAuthSchema = new Schema({
  asin:  {type: String},
  country:  {type: String},
  branch:  {type: String},
  createdAt: {type: Date, default: Date.now}
});

var logAuth = mongoose.model("logAuth", logAuthSchema);
module.exports = logAuth;
