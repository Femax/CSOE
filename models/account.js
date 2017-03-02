var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username: {
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

AccountSchema.methods = {

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
    }


};

AccountSchema.statics = {


    list: function() {
        return this.find()
            .populate('Lecture')
            .exec();
    }
}

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", AccountSchema);
