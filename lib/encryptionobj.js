var crypto = require('crypto');

var EncryptionObj = function EncryptionObj(unEncryptedPassword) {
	this.secretKey = 'superSecret';
	this.algorithm = 'aes-256-cbc';
}

EncryptionObj.prototype.encrypt = function(unEncryptedData) {
	var cipher = crypto.createCipher(this.algorithm, this.secretKey);
	var crypted = cipher.update(unEncryptedData, 'utf8', 'base64');
	crypted += cipher.final('base64');

	return crypted;
}

EncryptionObj.prototype.decrypt = function(encryptedData) {
	var decipher = crypto.createDecipher(this.algorithm, this.secretKey);
	var dec = decipher.update(encryptedData, 'base64', 'utf8')
	dec += decipher.final('utf8');

	return dec;
}

module.exports = new EncryptionObj();