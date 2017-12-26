const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
);

router.get(
  '/google/return',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => {
    res.redirect('/');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
