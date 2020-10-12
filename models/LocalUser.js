const mongoose = require('mongoose');

const LocalUserSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true,
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
  password : {
    type : String,
    required : true
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

LocalUserSchema.pre('remove' , async function(next){
  await Story.deleteMany({user : this._id});
});

LocalUserSchema.virtual('stories' , {
  ref : 'Story',
  localField : '_id',
  foreignField : 'user'
});

module.exports = mongoose.model('Luser' , LocalUserSchema);
