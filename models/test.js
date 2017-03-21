var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var TestSchema = new Schema({
    id:[{
      type:ObjectId
    }],
    question: [{
        type: String,
        required: true
    }],
    answer: [{
        type: String,
        required: true
    }],
    isEnabled: {
        type: Boolean,
        default: false
    },
    mark:{
      type:Number,
      default: 0
    }
});

module.exports = mongoose.model("Test", TestSchema);
