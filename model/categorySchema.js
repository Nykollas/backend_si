const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
                id_:ObjectId,
                name:String,
                searched_times:Number
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = { CategoryModel, CategorySchema}




