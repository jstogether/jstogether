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

/**
 *
 */
router.route('/:teamId/join')
.put((req, res) => {
	console.log(`PUT to /team/${req.params.teamId}/join`);
	console.log(req.user.username);

	const query = {
		_id: req.params.teamId
	};

	const update = {
		$push: {
			users: req.user.username
		}
	};

	Team.update(query, update, (err) => {
		if (err) return res.status(500).send(err);

		return res.sendStatus(200);
	});
});

/**
 *
 */
router.route('/:teamId/leave')
.put((req, res) => {
	console.log(`PUT to /team/${req.params.teamId}/leave`);
	console.log(req.user.username);

	const query = {
		_id: req.params.teamId,
		users: req.user.username
	};

	const update = {
		$pull: {
			users: req.user.username
		}
	};

	Team.update(query, update, (err) => {
		if (err) return res.status(500).send(err);

		return res.sendStatus(200);
	});
});

/**
 *
 */
router.route('/:teamId')
.delete((req, res) => {
	console.log(`DELETE to /team/${req.params.teamId}`);

	const query = {
		_id: req.params.teamId
	};

	Team.remove(query, (err) => {
		if (err) return res.status(500).send(err);

		return res.send({id: req.params.teamId});
	});
});

export default router;