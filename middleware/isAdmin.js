export default (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		return next();
	}

	return errorResponder(req, res, 403);
}