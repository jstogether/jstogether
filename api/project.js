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
		return $.ajax('/project/' + projectId, {
			method: 'DELETE'
		});
	},

	/**
	 *
	 */
	updateMarkdown (projectId, markdown) {
		return $.post('/project/' + projectId + '/markdown', {
			markdown
		});
	}
}