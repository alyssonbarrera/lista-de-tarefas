const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const flash = require('express-flash')
const createError = require('http-errors')
require('./controllers/passport')(passport)
require("dotenv-safe").config()

const db = require("./database/database");
db.connect()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/public', express.static(__dirname + '/public'))

app.use(cors())
app.use(flash())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")

// Middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

app.post('/', passport.authenticate('local', {
    successRedirect: '/tarefas',
    failureRedirect: '/?fail=true',
    failureFlash: true
}))

// Passport.js
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/signUp", (req, res) => {
    res.render('registrar')
})

app.use('/tarefas', isLoggedIn, (req, res) => {
    res.render('tarefas')
}); // se o user estiver autenticado, redireciona para a próxima função.

app.use("/tasks", isLoggedIn, taskRoutes)
app.use("/user", userRoutes)
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app