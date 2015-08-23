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
		return $.post('/project', {
			project
		});
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
	updateProject (project) {
		return $.ajax(`/project/${project.id}/`, {
			method: 'PUT',
			data: project
		});
	},

	/**
	 *
	 */
	createTeam (projectId, teamName) {
		return $.post(`/project/${projectId}/team`, {
			teamName
		});
	}
}