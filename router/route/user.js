import express from 'express';
import React from 'react';

import db from '../../db';

let router = express.Router();


// Get User by username
router.get('/:username', (req, res) => {
	let User = db.model('User');

	User.findOne({
		username: req.params.username
	}, (err, user) => {
		if (err) return res.sendStatus(500);
		if (!user) return res.sendStatus(404);

		return res.send(user.toClient());
	});
});

export default router;