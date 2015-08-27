import express from 'express';
import React from 'react';

import db from '../../db';
import isAdmin from '../../middleware/isAdmin';

const Team = db.model('Team');
const router = express.Router();

/**
 *
 */
router.route('/')
.get((req, res) => {
	// Get all teams
	console.log('GET to /team/');

	const query = {};

	Team.find(query, (err, teams) => {
		if (err) return res.status(500).send(err);
		if (!teams) return res.status(404).send('No Teams could be found');

		teams = teams.map(team => team.toClient());

		return res.send(teams);
	});
})
.post((req, res) => {
	// Create a new team
	console.log('POST to /team/');
	console.log(req.body);

	const query = req.body;

	Team.create(query, (err, team) => {
		if (err) return res.status(500).send(err);
		if (!team) return res.status(404).send('Team could not be created');

		return res.send(team.toClient());
	});	
});

export default router;