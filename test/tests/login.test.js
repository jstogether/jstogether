module.exports = {
	'UserInfo shows correct username': function (browser) {
		browser
			.url('http://localhost:1025')
			.waitForElementVisible('body', 1000)
			.setValue('input.login', 'Dave')
			.setValue('input.password', 'abcd')
			.waitForElementVisible('button.login', 1000)
			.click('button.login')
			.pause(1000)
			.assert.containsText('.userInfo span.username', 'Dave')
			.end();
	}
};