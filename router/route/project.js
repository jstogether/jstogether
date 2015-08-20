import express from 'express';
import React from 'react';

import db from '../../db';
import ensureAuthentication from '../../middleware/ensureAuthentication';

let Project = db.model('Project');
let router = express.Router();


// Create new Project
router.post('/', ensureAuthentication, (req, res) => {
	let project = req.body.project;
	let Project = db.model('Project');

	Project.create(project, (err, project) => {
		if (err) {
			console.log(1, err);
			let status = err.code === 11000 ? 409 : 500;
			return res.sendStatus(status);
		}

		return res.send(project.toClient());
	});
});


// Get existing projects
router.get('/', (req, res) => {
	Project.find((err, projects) => {
		if (err) return res.sendStatus(500);
		if (!projects) return res.sendStatus(404);

		projects = projects.map(project => project.toClient());
		return res.send(projects);
	});
});


// Delete project
router.delete('/:projectId', (req, res) => {
	let projectId = req.params.projectId;

	Project.findOneAndRemove({_id: projectId}, (err, project) => {
		if (err) return res.sendStatus(500).send(err);

		return res.send(project.toClient());
	});
});


// Update Project
router.post('/:projectId/:field', (req, res) => {
	let projectId = req.params.projectId;
	let field = req.params.field;
	let update = {};

	update[field] = req.body[field];

	Project.update({_id: projectId}, {
		$set: update
	}, (err) => {
		if (err) return res.sendStatus(500).send(err);

		Project.get(projectId, (err, project) => {
			if (err) return res.sendStatus(500).send(err);

			return res.send(project.toClient());
		});
	});
});

export default router;