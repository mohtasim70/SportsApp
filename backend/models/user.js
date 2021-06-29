
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      ranking: {
        type: String,
        default: 'Beginner'
      },
      timings: {
        type: String,
      },
      endTime:{
        type: String,
      },
      firsttime: {
        type: Boolean,
        default: true
      },
      attendance: [{
        
        date:{
          type: Date,
          default: Date.now,
        },
        entry:{type:Date},
       }],
      // games: [{
      //    game:  {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: "game",
        
      //   },
        
      //   priority: 
      //   {
      //     type: Number,
      //   default: ''
      //   }
       
       
      // }],
      games: [{
        type: Schema.Types.ObjectId,
        ref:"game"
    }],
    schedules: [{
      type: Schema.Types.ObjectId,
      ref:"schedule"
  }],
      rankingOpponent: {
        type: String,
        default: 'Beginner'
      },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);