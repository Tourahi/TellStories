const mongoose = require('mongoose');
const Story    = require('./Story.js');


const ForeignUserSchema = new mongoose.Schema({
  googleId: {
    type : String,
  },
  displayName: {
    type : String,
    required : true
  },
  firstName: {
    type : String,
    required : true
  },
  lastName: {
    type : String,
    required : true
  },
  image: {
    type : String,
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
});

ForeignUserSchema.pre('remove' , async function(next){
  await Story.deleteMany({user : this._id});
});

ForeignUserSchema.virtual('stories' , {
  ref : 'Story',
  localField : '_id',
  foreignField : 'user'
});

module.exports = mongoose.model('Fuser' , ForeignUserSchema);
