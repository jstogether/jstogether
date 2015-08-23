import express from 'express';
import React from 'react';

import db from '../../db';

let Project = db.model('Project');
let router = express.Router();


/**
 *
 */
router.param('projectId', (req, res, next) => {
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
router.route('/:projectId/team')
.get((req, res) => {
	console.log('GET to /project/:projectId/team');
	Project.get(req.projectId, (err, project) => {
		if (err) return res.sendStatus(500).send(err);

		return res.send(project);
	});
})
.post((req, res) => {
	console.log('POST to /project/:projectId/team');
	let name = req.body.teamName;

	if (!name) {
		return res.sendStatus(500).send(new Error('Attempt to create a new team with no name'));
	}

	Project.update({_id: req.projectId}, {
		$push: {
			teams: {name}
		}
	}, (err) => {
		if (err) return res.sendStatus(500).send(err);

		Project.get(req.projectId, (err, project) => {
			if (err) return res.sendStatus(500).send(err);

			return res.send(project.toClient());
		});
	});
});


/**
 *
 */
router.route('/:projectId')
.put((req, res) => {
	console.log('PUT to /project/:projectId');
	Project.update({_id: req.projectId}, {
		$set: req.body
	}, (err) => {
		if (err) return res.sendStatus(500).send(err);

		Project.get(req.projectId, (err, project) => {
			if (err) return res.sendStatus(500).send(err);

			return res.send(project.toClient());
		});
	});
})
.delete((req, res) => {
	console.log('DELETE to /project/:projectId');
	Project.findOneAndRemove({_id: req.projectId}, (err, project) => {
		if (err) return res.sendStatus(500).send(err);

		return res.send(project.toClient());
	});
});


/**
 *
 */
router.route('/')
.post((req, res) => {
	console.log('POST to /project/');
	let project = req.body.project;
	let Project = db.model('Project');

	Project.create(project, (err, project) => {
		if (err) {
			let status = err.code === 11000 ? 409 : 500;
			return res.sendStatus(status);
		}

		return res.send(project.toClient());
	});
})
.get((req, res) => {
	console.log('GET to /project/');
	Project.find((err, projects) => {
		if (err) return res.sendStatus(500);
		if (!projects) return res.sendStatus(404);

		projects = projects.map(project => project.toClient());
		return res.send(projects);
	});
});


export default router;