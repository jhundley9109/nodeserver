var express = require('express');
var router = express.Router();
var dataAccessObj = require('_/dataaccessobj');
var encryptionObj = require('_/encryptionobj');

router.get('/', function(req, res) {
	res.render('createaccount');
});

router.get('/create', function(req, res) {
	var errorType = req.query.errortype;
	var errorString = '';
	if (errorType == 'duplicate') {
		errorString = 'This user name is already taken';
	}
	else if (errorType == 'usernamelen') {
		errorString = 'Please make your user name longer than 6 characters';
	}
	else if (errorType == 'passwordlen') {
		errorString = 'Please make your password longer than 6 characters';
	}

	res.render('createaccount', {
		title: 'Create An Account',
		errorString: errorString
	});
});

router.post('/create', function(req, res) {
	var userName = req.body.username;
	var password = req.body.password;

	var errorType = '';
	if (userName.length < 6) {
		errorType = 'usernamelen';
	}
	else if (password.length < 6) {
		errorType = 'passwordlen';
	}

	if (errorType !== '') {
		res.redirect('/account/create?errortype=' + errorType);
	}
	else {
		var encryptedPassword = encryptionObj.encrypt(password);
		dataAccessObj.createAccount({
			userName: userName,
			password: encryptedPassword
		}, function(accountId) {
			if (accountId == 0) {
				res.redirect('/account/create?errortype=duplicate');
			}
			else {
				var session = req.session;
				session.accountId = accountId;
				res.redirect('/account/myaccount');
			}
		});
	}
});

router.get('/signin', function(req, res) {
	res.render('signinaccount', {
		title: "Sign in to your account"
	})
})

router.get('/search', function(req, res) {
	var userName = req.query.username;
	dataAccessObj.getAccountByUserName({
		userName: userName
	}, function(results) {
		res.send(results);
	});
});

router.get('/myaccount', function(req, res) {
	res.render('myaccount');
});

module.exports = router;