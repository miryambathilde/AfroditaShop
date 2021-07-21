const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

// DOT ENV LIBRERIA //
require('dotenv').config();

//require('./PruebaConexionDB');

/* DBCONFIG */
require('./dbConfig');

// ROUTES //
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const productsRouter = require('./routes/products');

// app de express
const app = express();

// view engine setup --view=pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//flash and session //
app.use(cookieParser('secret'));
app.use(
	session({
		secret: 'SECRET',
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());

// QUERIES API //
// delegación a la API //
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
