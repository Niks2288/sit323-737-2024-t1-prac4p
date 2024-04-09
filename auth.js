const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const secret= 'secretkey'
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret 
  }, 
  function (jwtPayload, done)  {
    console.log("Entered stragy");
    if (Date.now() > jwtPayload.expires) {
        console.log("Token expired");
        return done('jwt expired', false);
        }
        console.log("Token Valid");
        return done(null, jwtPayload.user);
 
}));

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

// generate a JWT token

function generateToken(user) {
const Payload= { user };
const token = jwt.sign( Payload , secret, {expiresIn: '1d'});
return token;
}

module.exports = { passport, generateToken };