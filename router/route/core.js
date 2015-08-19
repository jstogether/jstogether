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
	let html = React.renderToString(App());

	return res.render('index', {
		html: html
	});
});

export default router;