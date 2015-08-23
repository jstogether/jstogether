import express from 'express';
import React from 'react';

import db from '../../db';
import isAdmin from '../../middleware/isAdmin';

let Project = db.model('Project');
let router = express.Router();

/**
 *
 */
router.param('projectId', (req, res, next) => {
	// Parse param and provide error if not supplied
	console.log('projectID Param');
	if (req.params.projectId) {
		req.projectId = req.params.projectId;
		return next();
	}

	return next(new Error('No ProjectID supplied'));
});


/**
 *
 */
router.route('/')
.get((req, res) => {
	// Get all projects
	console.log('GET to /project/');
	Project.find((err, projects) => {
		if (err) return res.sendStatus(500);
		if (!projects) return res.sendStatus(404);

		projects = projects.map(project => project.toClient());
		return res.send(projects);
	});
})
.post(isAdmin, (req, res) => {
	// Create a new project
	console.log('POST to /project/');

	Project.create(req.body, (err, project) => {
		if (err) {
			let status = err.code === 11000 ? 409 : 500;
			return res.sendStatus(status);
		}

		return res.send(project.toClient());
	});
});


/**
 *
 */
router.route('/:projectId')
.get((req, res) => {
	// Get a given project
	console.log('GET to /project/:projectId');
	Project.get(req.projectId, (err, project) => {
		if (err) return res.status(404).send(err);

		return res.send(project.toClient());
	});
})
.put((req, res) => {
	// Update a given project
	console.log('PUT to /project/:projectId');
	console.log(req.body);

	Project.update({_id: req.projectId}, {
		$set: req.body
	}, (err) => {
		if (err) return res.status(500).send(err);

		Project.get(req.projectId, (err, project) => {
			if (err) return res.status(500).send(err);

			return res.send(project.toClient());
		});
	});
})
.delete((req, res) => {
	// Delete a given project
	console.log('DELETE to /project/:projectId');
	Project.findOneAndRemove({_id: req.projectId}, (err, project) => {
		if (err) return res.status(500).send(err);

		return res.send(project.toClient());
	});
});


/**
 *
 */
router.route('/:projectId/team')
.get((req, res) => {
	// Get all teams for a given project
	console.log('GET to /project/:projectId/team');
	Project.get(req.projectId, (err, project) => {
		if (err) return res.status(500).send(err);

		return res.send(project.teams);
	});
})
.post((req, res) => {
	// Create a new team for a given project
	console.log('POST to /project/:projectId/team');
	let team = req.body;

	if (!team.name) return res.status(500).send(new Error('Attempt to create a new team with no name'));

	Project.update({_id: req.projectId}, {
		$push: {
			teams: team
		}
	}, (err) => {
		if (err) return res.status(500).send(err);

		Project.get(req.projectId, (err, project) => {
			if (err) return res.status(500).send(err);

			return res.send(project.toClient());
		});
	});
});


export default router;