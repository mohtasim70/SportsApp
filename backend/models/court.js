var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema
var court = new Schema({
   name: {
      type: String
   },
   game:{
       type: Schema.Types.ObjectId,
       ref:"game"
   }
},
   {
    collection: 'courts'
  
})

module.exports = mongoose.model('court', court)