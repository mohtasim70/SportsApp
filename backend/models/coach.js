var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Define collection and schema
var coach = new Schema({
    name: {
        type: String
    },
}, {
    collection: 'coaches'

})

module.exports = mongoose.model('coach', coach)