import express from 'express';
import path from 'path';
import React from 'react';

import AppComponent from '../../component/app';

let router = express.Router();
let App = React.createFactory(AppComponent);

/**
 *
 */
router.get('/', (req, res) => {
	const html = React.renderToString(App());
	const user = req.user;

	return res.render('index', {
		html,
		user: 'var user = ' + JSON.stringify(user)
	});
});

export default router;