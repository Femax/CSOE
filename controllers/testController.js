var express = require('express');
var testRoute = express.Router();
var Test = require('../models/test');

testRoute.get('/test/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Test.findOne({
        _id: id
    }, function(err, test) {
      if(err) console.log(err);
        return res.render('test.html', {
            item: test
        });
    });
})

testRoute.get('/test', function(req, res) {
    var id = req.params.id;
    console.log(id);
    Test.findOne({
        _id: id
    }, function(err, test) {
        return res.render('ntest.html');
    });
})

testRoute.post('/test', function(req, res) {
  console.log(req.body);
    const question = req.body.question;
    const answer = req.body.answer;

    var newTest = Test({
        question: question,
        answer: answer
    });

    newTest.save(function(err,test) {
      if(err) console.log(err);
        res.send(test);
    });
})


module.exports = testRoute;
