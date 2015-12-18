var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//variable que contiene las credenciales de google para consumir la api mediante oauth
var configAuth = require('../config/auth');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });
    
    /*
        GoogleStrategy se utiliza en conjunto con Passport
        que acepta las credenciales de Google
    */
    
    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            //console.log(profile);
            process.nextTick(function() {
    
                // To keep the example simple, the user's Google profile is returned to
                // represent the logged-in user.  In a typical routerlication, you would want
                // to associate the Google account with a user record in your database,
                // and return that user instead.
                return done(null, profile);
            });
        }
    ))
}