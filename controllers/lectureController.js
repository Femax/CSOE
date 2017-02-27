var express = require('express');
var lectureRoute = express.Router();
var Lectures = require('../models/lecture')

lectureRoute.get('/nlecture', function(req, res) {
    res.render('nlecture.html');
})

lectureRoute.get('/lecture/:id', function(req, res) {
return res.render('lecture.html')
})
lectureRoute.post('/lecture', function(req, res) {
    //params sended from client
    console.log(req.body);
    const data = JSON.parse(JSON.stringify(req.body));
    const lecture = data.lecture;
    console.log(data.lecture);
    //construct location
    Lectures.save(lecture, function(err, savedLecture) {
        if (err) {
            res.status(405).send(err.message);
        }
        res.status(200).send({
            message: "Успешно сохраненно"
        });
    });


});
module.exports = lectureRoute;
