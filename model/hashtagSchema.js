var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HashtagSchema = new Schema({
  id_:ObjectId,
  name:{type:String, unique:false, required:true},
  searched_times:{type:Number, require:false}
});

var HashtagModel =   mongoose.model('Hashtag', HashtagSchema);

module.exports.HashtagModel = HashtagModel;
module.exports.HashtagSchema = HashtagSchema;
