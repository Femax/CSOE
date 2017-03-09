var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var AnswerSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    right:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Test", TestSchema);
