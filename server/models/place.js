const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema ({
  id:{
    type:String,
    required: [true, 'name is required'],
    unique: true
  },
  name:String,
  value:Number,
  who:[]



});
const Place = mongoose.model('place', PlaceSchema);
module.exports = Place;
