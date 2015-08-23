let messages = {
	403: 'Unauthorised',
	404: 'Page Not Found',
	500: 'Internal Server Error'
};

let html = (res, code, msg) => {
	return res.status(code).render('error', {
		code: code,
		msg: messages[code],
		message: msg
	});
}

let json = (res, code, msg) => {
	return res.status(code).send({
		code: code,
		err: messages[code],
		message: msg
	});
}

export default (req, res, code, msg) => {
	console.log('Responding to error');
	console.log(code, msg);
	if (req.accepts('json')) {
		return json(res, code, msg);
	}

	if (req.accepts('html')) {
		return html(res, code, msg);
	}

	return res.status(code).send(msg);
}