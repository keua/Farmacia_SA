var express = require('express');
var app = express.Router();
var passport = require("passport");
var controllers = require('../app/controllers');
/* 
    GET home page.
    Redirecciona a la página index.ejs dentro de la carpeta views
*/
app.get('/', function(req, res, next) {
  res.render('pages/index', { user: null });
});

app.get('/Client/:nit', controllers.client.getClient);

app.post('/Client', controllers.client.createClient);

app.delete('/Client/:id', controllers.client.deleteClient);

app.put('/Client/:id', controllers.client.updateClient);

app.get('/Animal/:id', controllers.animal.getAnimalAll);

app.post('/Animal', controllers.animal.createAnimal);

app.delete('/Animal/:id/:pet', controllers.animal.deleteAnimal);
//*******************************************************************************
//*******************************************************************************
//*******************************************************************************
/*
    GET /profile
    de momento solo envía el usuario a la pantalla principal
*/
app.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('pages/profile', {
        user : req.user // get the user out of session and pass to template
    });
})

/*
    GET /profile
    de momento solo envía el usuario a la pantalla principal
*/
app.get('/apps', isLoggedIn, function(req, res, next) {
    res.render('pages/apps', {
        user : req.user // get the user out of session and pass to template
    });
})

app.get('/user', isLoggedIn, function(req, res, next) {
    res.send(req.user);
})

/*
    GET /auth/google
    Ruta que nos dirige a la api de google para loguearnos
    utilizando las passport.js que contiene las credenciales de nuestra
    api de Google, al terminar la utenticación, nos redirige a /oauth2callback
*/
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }),
    function(req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    });

/*
    GET /auth/google/callback
    Ruta por donde google retorna la información solicitada del usuario 
    que acaba de loguearse
    
*/
app.get('/oauth2callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/profile');
    });

/*
    GET /logout
    Utiliza passport.js para utilizar la función logout
    de la petición, por ende pone al atributo user en null
*/
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
    //res.redirect('https://accounts.google.com/logout');
});

/* 
    Middle utilizado para verificar que existe un usuario autenticado
    para realizar cualquier operación
 */
function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
}
module.exports = app;