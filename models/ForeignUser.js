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
},{
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  }
});

ForeignUserSchema.pre('remove' , async function(next){
  await Story.deleteMany({user : this._id});
});



module.exports = mongoose.model('Fuser' , ForeignUserSchema);
