import $ from 'jquery';

export default {
	/**
	 *
	 */
	fetchProjects () {
		return $.get('/project');
	},

	/**
	 *
	 */
	createProject (project) {
		return $.post('/project', project);
	},

	/**
	 *
	 */
	deleteProject (projectId) {
		return $.ajax(`/project/${projectId}/`, {
			method: 'DELETE'
		});
	},

	/**
	 *
	 */
	updateProject (projectId, project) {
		return $.ajax(`/project/${projectId}/`, {
			method: 'PUT',
			data: project
		});
	},

	/**
	 *
	 */
	createTeam (projectId, team) {
		return $.post(`/project/${projectId}/team`, team);
	}
}