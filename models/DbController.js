var Lectures = require('../models/lecture');
var Test = require('../models/test');

module.exports.save = async function unicorn(query) {
        return await Lecture.save(query).exec();

}
