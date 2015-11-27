var config = require('./config.json');
var merge = require('utils-merge');

// console.log(config)

function ConfigObj()
{
	merge(this, config);
}

module.exports = new ConfigObj();