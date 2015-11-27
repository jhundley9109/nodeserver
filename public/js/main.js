function checkUserName() {
	$('#userName').on('keyup', function(e) {
		if (e.keyCode === 13) {
			var params = { search: $(this).val() };
			$.get('/account/search', params, function(data) {
				console.log(data)
			});
		}
	});
}