var express = require('express');
var lectureRoute = express.Router();
var Lectures = require('../models/lecture');
var Test = require('../models/test');

lectureRoute.get('/nlecture', function(req, res) {
    res.render('nlecture.html');
})

lectureRoute.get('/lecture/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Lectures.findOne({
        _id: id
    }, function(err, lecture) {
        return res.render('lecture.html', {
            lecture: lecture
        });
    });
})
lectureRoute.post('/lecture', function(req, res) {
    //params sended from client
    console.log(req.body);
    const lecture = req.body;
    console.log(lecture);
    //construct location
    // var  lectureInstance = new Lectures({
    //     title: lecture.title,
    //    content: lecture.content
    // });
    var test = Test.findOne({
        answer: "4"
    }).exec().then(function(test) {
        var lectureInstance = new Lectures({
            title: lecture.title,
            content: lecture.content,
            status: false,
            test: test._id
        });
        return lectureInstance.save();
    }).then(function(lectureInstance) {
        res.status(200).send(lectureInstance);
    }).catch(function (err) {
      console.log('error:',err);
    });



});

lectureRoute.post('/opentTest', function(req, res) {
    //params sended from client
    const lecture = req.body;
    Lecture.findOne({
        _id: req.body.id
    }).populate('Test').exec(function functionName(err, lecture) {
        lecture.test.isEnabled = true;
        Test.findOneAndUpdate({
            _id: lecture.test._id
        }, lecture.test, {
            upsert: true
        }, function(err, doc) {
            if (err) return res.send(500, {
                error: err
            });
            return res.send(200, {});
        });
    });

});
module.exports = lectureRoute;
