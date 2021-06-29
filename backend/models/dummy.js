const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Dummy = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   sdeded: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'dummy'
})

module.exports = mongoose.model('Dummy', Dummy)