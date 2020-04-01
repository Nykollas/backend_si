var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id_: ObjectId,
  name: String,
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true}
});

//Valida e-mail
UserSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, "E-mail inválido");

UserSchema.plugin( uniqueValidator );

var UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;
