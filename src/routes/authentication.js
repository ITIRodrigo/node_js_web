const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth')
 

router.get('/signup', isNotLoggedIn, (req,res) => {
    res.render('../views/auth/signup');
})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/links/',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('../views/auth/signin');
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/links/',
        failureRedirect: 'signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/signin')
})

module.exports = router;