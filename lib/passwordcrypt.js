var crypto = require('crypto');

var EncryptionObj = function EncryptionObj(unEncryptedPassword)
{
	this.secretKey = "superSecret";
	this.algorithm = "md5"
}

EncryptionObj.prototype.encrypt = function(unEncryptedData) {
	var cipher = crypto.createCipher(this.algorithm, this.secretKey);
	var crypted = cipher.update(unEncryptedData, 'utf8', 'hex');
	crypted += cipher.final('hex');

	return crypted;
}

EncryptionObj.prototype.decrypt = function(encryptedData) {
	var decipher = crypto.createDecipher(this.algorithm, this.secretKey);
	var dec = decipher.update(encryptedData, 'hex', 'utf8')
	dec += decipher.final('utf8');

	return dec;
}

module.exports = new EncryptionObj();