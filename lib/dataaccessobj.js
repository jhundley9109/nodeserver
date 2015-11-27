var mysql = require('mysql');
var SessionStore = require('express-mysql-session');
var configObj = require('_/configobj');

var DataAccessObj = function DataAccessObj() {
	var dbh = mysql.createPool({
		host: configObj.database.host,
		user: configObj.database.user,
		password: configObj.database.password,
		database: 'application'
	});

	var sessionStore = new SessionStore({}, dbh);
	this.sessionStore = sessionStore;

	this.dbh = dbh;
}

DataAccessObj.prototype.createAccount = function(params, callback) {
	this.dbh.query({
		sql: 'INSERT INTO account (user_name, password) VALUES (?, ?)',
		values: [params.userName, params.password]
	}, function(err, results) {
		if (err) {
			callback(0)
		}
		else {
			callback(results.insertId);
		}
	});
}

DataAccessObj.prototype.getAccountByUserName = function(params, callback) {
	this.dbh.query({
		sql: 'SELECT * FROM account WHERE user_name = ?',
		values: [params.userName]
	}, function(err, results) {
		callback(results)
	});
}

module.exports = new DataAccessObj();