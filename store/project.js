import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';

class ProjectStore extends Store {
	/**
	 *
	 */
	constructor () {
		super();
		
		this.data = {
			currentProject: null,
			projects: []
		};
	}

	/**
	 *
	 */
	getCurrentProject () {
		return this.data.currentProject;
	}

	/**
	 *
	 */
	getProjects () {
		return this.data.projects;
	}

	/**
	 *
	 */
	onSelectProject (project) {
		this.data.currentProject = project;
		this.emitChange();
	}

	/**
	 *
	 */
	onFetchProjectsSuccess (projects) {
		this.data.projects = projects;
		this.emitChange();
	}

	/**
	 *
	 */
	onCreateProjectSuccess (project) {
		this.data.projects.push(project);
		this.data.currentProject = project;
		this.emitChange();
	}

	/**
	 *
	 */
	onUpdateProjectSuccess (project) {
		for (let i = 0, len = this.data.projects.length; i < len; i += 1) {
			if (this.data.projects[i].id === project.id) {
				this.data.projects.splice(i, 1, project);
				this.data.currentProject = project;

				this.emitChange();
			}
		}
	}

	/**
	 *
	 */
	onDeleteProjectSuccess (project) {
		for (let i = 0, len = this.data.projects.length; i < len; i += 1) {
			if (this.data.projects[i].id === project.id) {
				this.data.projects.splice(i, 1);
				this.data.currentProject = null;

				this.emitChange();
			}
		}
	}

	/**
	 *
	 */
	onLogout () {
		this.data.currentProject = null;
	}
};

let projectStore = new ProjectStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case Constant.DUMP_STORE:
		if (action.store === 'Project') {
			projectStore.dumpToConsole();
		}
	break;
	case Constant.LOGOUT_SUCCESS:
		projectStore.onLogout();
	break;
	case Constant.SHOW_CREATE_PROJECT:
		projectStore.onSelectProject('createNew');
	break;
	case Constant.SELECT_PROJECT:
		projectStore.onSelectProject(action.project);
	break;
	case Constant.FETCH_PROJECTS_SUCCESS:
		projectStore.onFetchProjectsSuccess(action.projects);
	break;
	case Constant.CREATE_PROJECT_SUCCESS:
		projectStore.onCreateProjectSuccess(action.project);
	break;
	case Constant.CREATE_PROJECT_FAIL:
		console.log('Create project fail: ', action.err);
	break;
	case Constant.UPDATE_PROJECT_SUCCESS:
		projectStore.onUpdateProjectSuccess(action.project);
	break;
	case Constant.DELETE_PROJECT_SUCCESS:
		projectStore.onDeleteProjectSuccess(action.project);
	break;
	case Constant.DELETE_PROJECT_FAIL:
		console.log('Failed to delete project: ', action.err);
	break;
	}
});

export default projectStore;
