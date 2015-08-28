import express from 'express';
import React from 'react';

import db from '../../db';
import isAdmin from '../../middleware/isAdmin';

const Project = db.model('Project');
const Team = db.model('Team');
const router = express.Router();


/**
 *
 */
router.route('/')
.get((req, res) => {
	// Get all projects
	console.log('GET /project/');

	Project.find((err, projects) => {
		if (err) return res.status(500).send(err);
		if (!projects) return res.status(404).send('No Projects Found');

		projects = projects.map(project => project.toClient());

		return res.send(projects);
	});
})
.post(isAdmin, (req, res) => {
	// Create a new project
	console.log('POST /project/');
	console.log(req.body);

	const query = req.body;

	Project.create(query, (err, project) => {
		if (err) return res.status(500).send(err);
		if (!project) return res.status(404).send('Project could not be created');

		return res.send(project.toClient());
	});
});


/**
 *
 */
router.route('/:projectId')
.get((req, res) => {
	// Get a given project
	console.log(`GET /project/${req.params.projectId}`);

	Project.getById(req.params.projectId, (err, project) => {
		if (err) return res.status(500).send(err);
		if(!project) return res.status(404).send('Project Not Found');

		return res.send(project.toClient());
	});
})
.put(isAdmin, (req, res) => {
	// Update a given project
	console.log(`PUT /project/${req.params.projectId}`);
	console.log(req.body);

	const query = {
		_id: req.params.projectId
	};

	const update = {
		$set: req.body
	};

	Project.update(query, update, (err) => {
		if (err) return res.status(500).send(err);

		Project.getById(req.params.projectId, (err, project) => {
			if (err) return res.status(500).send(err);
			if(!project) return res.status(404).send('Project Not Found');

			return res.send(project.toClient());
		});
	});
})
.delete(isAdmin, (req, res) => {
	// Delete a given project
	console.log(`DELETE /project/${req.params.projectId}`);

	const query = {
		_id: req.params.projectId
	};

	Project.remove(query, (err) => {
		if (err) return res.status(500).send(err);

		return res.send({id: req.params.projectId});
	});
});


/**
 *
 */
router.route('/:projectId/teams')
.get((req, res) => {
	// Get all teams for a given project
	console.log(`GET /project/${req.params.projectId}/teams`);

	Team.getByProjectId(req.params.projectId, (err, teams) => {
		if (err) return res.status(500).send(err);
		if (!teams) return res.status(404).send('No Teams Found for Project');

		teams = teams.map(team => team.toClient());

		return res.send(teams);
	});
});


export default router;