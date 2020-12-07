var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var bodyParser = require('body-parser');
var server = express();
server.use(passport.initialize());
server.use(bodyParser.urlencoded({ extended: true }))

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    // Would perform lookup and verification here.
    // Instead return a valid user object every time.
    console.log(username + ' ; ' + password)
    var user = { username: username };
    return done(null, user);
  }
));

server.get('/login', (req, res, next) => {
  const form = '<h1>Login Page</h1><form method="POST" action="/login">\
  Enter Username:<br><input type="text" name="username">\
  <br>Enter Password:<br><input type="password" name="password">\
  <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

server.post('/login', passport.authenticate('local', { failureRedirect: '/failure'}), function (req, res) {
  res.send('access granted');
});

var port = 3310
server.listen(port,  function() {
  console.log('Listening on port ' + port);
});