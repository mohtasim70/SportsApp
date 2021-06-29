var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema
var game = new Schema({
    name: {
        type: String
    },
    noofcourt: {
        type: Number
    },
    coaches: [{
        type: Schema.Types.ObjectId,
        ref: "coach"
    }],
    courts: [{
        type: Schema.Types.ObjectId,
        ref: "court"
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
}, {
    collection: 'games'

})

module.exports = mongoose.model('game', game)