const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();
const Lectures = require('../models/lecture');


router.get('/index', function(req, res) {
    var account = req.user;
    console.log(account);
    Account.find({
        username: account.username
    }, function(err, data) {
        res.render('index.html', {
            items: data.lectures
        });
    })
});

router.get('/register', (req, res) => {
    res.render('register.html', {});
});

router.post('/register', (req, res, next) => {
    Lectures.find({}, function(err, lectures) {
      var lecturesMap;

        lectureMap = lectures;

        console.log(lectures);
        Account.register(new Account({
            username: req.body.username,
            lectures: lectures
        }), req.body.password, (err, account) => {
            if (err) {
                console.log(err.message);
                return res.render('register.html', {
                    error: err.message
                });
            }

            passport.authenticate('local')(req, res, () => {
                req.session.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });

    });

});


router.get('/auth', (req, res) => {
    res.render('auth.html', {
        user: req.user
    });
});

router.post('/auth', passport.authenticate('local', {
    failureRedirect: '/auth',
    failureFlash: true
}), (req, res, next) => {
    console.log("asda");
    req.session.save((err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        console.log("no error");
        res.redirect('/index.html');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/ping', (req, res) => {
    res.status(200).send("pong!");
});

module.exports = router;
