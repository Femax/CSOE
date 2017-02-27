var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    phone: {
        type: Number,
        required: false
    },
    lectures: [{
        type: ObjectId,
        ref: 'Lecture'
    }]

});

UserSchema.methods = {

    /**
     * Update token
     *
     * @param {String} token
     * @api private
     */

    updateToken: function(token) {
        this.token = token;
        return this.save();
    },


    /**
     * Delete current token
     *
     * @api private
     */

    deleteToken: function() {
        this.token = {};
        this.save();
    },


    /**
     * Delete current token
     *
     * @api private
     */

        setLectures: function(lectures) {
        this.lections = lectures;
        this.save();
    },

        list: function() {
        return this.find()
            .populate('Lecture')
            .exec();
    }


};


module.exports = mongoose.model("User", UserSchema);
