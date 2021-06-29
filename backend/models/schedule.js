var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema
var schedule = new Schema({
    sessionType: {
        type: String
    },
    date:{
        type: Date
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "game"
    },
    coach: {
        type: Schema.Types.ObjectId,
        ref: "coach"
    },
    court: {
        type: Schema.Types.ObjectId,
        ref: "court"
    },
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    completed:{
        type:Boolean,
        default: false
    },
    result:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    permit:{
        type:Boolean,
        default: false
    },
    Showranking:{
        type: Boolean,
        default:false
    }
}, {
    collection: 'schedules'

})

module.exports = mongoose.model('schedule', schedule)