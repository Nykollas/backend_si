var mongoose = require('mongoose');
const Hashtag = require('./hashtagSchema');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EmpresaSchema = new Schema({
  id_: ObjectId,
  name: String,
  email: String,
  category: String,
  street: String,
  place: String,
  city: String,
  uf: String,
  tel: String,
  hashtags:[Hashtag.HashtagSchema],
});

var EmpresaModel = mongoose.model('Empresa', EmpresaSchema);

module.exports = EmpresaModel;
