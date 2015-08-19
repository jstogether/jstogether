import $ from 'jquery';

export default {
	/**
	 *
	 */
	fetchProjects () {
		console.log('api.fetchProjects');
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
		return $.ajax('/project/' + projectId, {
			method: 'DELETE'
		});
	}
}