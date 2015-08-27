import express from 'express';
import React from 'react';

import db from '../../db';

const User = db.model('User');
const router = express.Router();

/**
 *
 */
router.route('/:username')
.get((req, res) => {
	// Get User by username
	console.log('GET to /users/' + req.params.username);

	User.getByUsername(req.params.username, (err, user) => {
		if (err) return res.sendStatus(500);
		if (!user) return res.sendStatus(404);

		return res.send(user.toClient());
	});
});

/**
 *
 */
router.route('/')
.get((req, res) => {
	// Get existing users
	console.log('GET to /users/');

	User.find((err, users) => {
		if (err) return res.sendStatus(500);
		if (!users) return res.sendStatus(404);

		users = users.map(user => user.toClient());
		return res.send(users);
	});
});

export default router;