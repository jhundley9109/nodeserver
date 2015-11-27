var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configObj = require('_/configobj');
var dataAccessObj = require('_/dataaccessobj');

var index = require('./routes/index');
var nodeRoute = require('./routes/node');
var accountRoute = require('./routes/account');
var contactRoute = require('./routes/contact');

const PORT = 3000;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); // I don't think I need this. It allows for req.cookies

app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		name: 'sessionid',
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: dataAccessObj.sessionStore,
		cookie: {
			maxAge: (60 * 24 * 1000)
		}
	})
);

app.use(function(req, res, next) {
	var session = req.session;
	if (session.views) {
		session.views++;
	}
	else {
		session.views = 1;
	}

	next();
});

app.use('/', index);
app.use('/node', nodeRoute);
app.use('/account', accountRoute);
app.use('/contact', contactRoute);

var server = app.listen(PORT);
