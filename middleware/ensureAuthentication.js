import errorResponder from './errorResponder';

export default (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	return errorResponder(req, res, 403);
}