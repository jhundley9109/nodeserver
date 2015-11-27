$(function() {
	$('#userName').on('blur', function(e) {
		var userName = $(this).val();
		if (validUserName(userName)) {
			checkUserNameTaken(userName);
		}
	});

	$('#password').on('blur', function(e) {
		validPassword($(this).val())
	});

	$('#signupForm').on('submit', validateSignupForm)
});

function checkUserNameTaken(userName) {
	if (userName.length < 6) {
		$('#userNameValid').html('<span style="color:red;">Please user 6 or more characters</span>');
		return false;
	}
	else {
		var params = { username: userName };
		$.get('/account/search', params, function(data) {
			// No record found
			if (data[0] === undefined) {
				$('#userNameValid').html('');
				return true;
			}
			else {
				$('#userNameValid').html('<span style="color:red;">That user name is already taken</span>');
				return false;
			}
		});
	}
}

function validPassword(password) {
	if (password.length < 6) {
		$('#passwordValid').html('<span style="color:red;">Please user 6 or more characters</span>');
		return false;
	}
	else {
		$('#passwordValid').html('');
		return true;
	}
}

function validUserName(userName) {
	if (userName.length < 6) {
		$('#userNameValid').html('<span style="color:red;">Please user 6 or more characters</span>');
		return false;
	}
	else {
		return true;
	}
}

function validateSignupForm(e) {
	if (validUserName($('#userName').val()) && validPassword($('#password').val())) {
		return true;
	}
	else {
		return false;
	}
}