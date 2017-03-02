var express = require('express');
var lectureRoute = express.Router();
var Lectures = require('../models/lecture')

lectureRoute.get('/nlecture', function(req, res) {
    res.render('nlecture.html');
})

lectureRoute.get('/lecture/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Lectures.findOne({_id:id},function (err,lecture) {
      return res.render('lecture.html',{lecture:lecture});
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
    //     content: lecture.content
    // });
    var lectureInstance = new Lectures({
      title: lecture.title,
      content: lecture.content,
      status: false
    });
    lectureInstance.save(function(err, savedLecture) {
        if (err) {
            console.log(err.message);
            res.status(400).send(err.message);
        } else {
          console.log(savedLecture);
            res.status(200).send({
                lecture: savedLecture,
                message: "Успешно сохраненно"
            });
        }
    });
});
module.exports = lectureRoute;
