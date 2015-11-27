var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var queryString = req.query;

	res.render('node', {
		param: queryString.testparam,
		header: 'This is my header',
		array: [1, 2, 3],
		object: {
			'key': 'value'
		}
	});
});

module.exports = router;