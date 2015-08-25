import express from 'express';
import React from 'react';

import db from '../../db';

let User = db.model('User');
let router = express.Router();


// Get User by username
router.get('/:username', (req, res) => {

	User.findOne({
		username: req.params.username
	}, (err, user) => {
		if (err) return res.sendStatus(500);
		if (!user) return res.sendStatus(404);

		return res.send(user.toClient());
	});
});


// Get existing users
router.get('/', (req, res) => {
	User.find((err, users) => {
		if (err) return res.sendStatus(500);
		if (!users) return res.sendStatus(404);

		users = users.map(user => user.toClient());
		return res.send(users);
	});
});

router.get('/:username/email', (req, res) => {

    User.findOne({
        username: req.params.username
    }, (err, user) => {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(404);

        return res.send(user.toClient());
    });
});

export default router;