const express = require('express');
const passport = require('passport');
const router = express.Router();
const {loginCtrl, registerCtrl} = require('../controllers/auth');
const passportConfig = require('../config/passport');

// Config Passport
passportConfig(passport);

// Auth with Google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google auth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
      try {
        req.session.user = req.user;
        res.redirect('/'); // Redirect to the main page
    } catch(error) {
      console.error(error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  }
);


// Logout user
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});

//Login
router.post('/login', loginCtrl)


//Register an user
router.post('/register', registerCtrl)

module.exports = router;



