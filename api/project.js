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
	updateName (projectId, name) {
		return $.post('/project/' + projectId + '/name', {
			name
		});
	},

	/**
	 *
	 */
	updateScope (projectId, scope) {
		return $.post('/project/' + projectId + '/scope', {
			scope
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