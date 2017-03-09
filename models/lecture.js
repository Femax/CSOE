var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var LectureSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
    },
    test: {
        type: ObjectId,
        ref:'Test'
    }
});

module.exports = mongoose.model("Lecture", LectureSchema);
