import errorResponder from '../../middleware/errorResponder';

export default (app) => {
	// 404: Not found
	app.use((req, res) => errorResponder(req, res, 404));

	// 500: Internal server error
	app.use((err, req, res, next) => {
		var msg = '<strong>' + err.message + '</strong><pre>' + err.stack + '</pre>';

		return errorResponder(req, res, 500, msg);
	});
};