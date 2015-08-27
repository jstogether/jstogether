import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import ServerActions from './server';

import UserApi from '../api/user';
import ProjectApi from '../api/project';
import TeamApi from '../api/team';

export default {
	/**
	 * Global
	 */
	dumpStore (store) {
		AppDispatcher.dispatch({
			actionType: Constant.DUMP_STORE,
			store
		});
	},

	/**
	 *
	 */
	echo (message) {
		AppDispatcher.dispatch({
			actionType: Constant.ECHO,
			message
		});
	},

	/**
	 *
	 */
	navigate (page, skipHistory) {

		AppDispatcher.dispatch({
			actionType: Constant.NAVIGATE,
			page
		});
	},
	
	/**
	 * Session
	 */
	login (credentials) {
		AppDispatcher.dispatch({
			actionType: Constant.LOGIN_ATTEMPT
		});

		UserApi.login(credentials)
		.done(ServerActions.loginSuccess)
		.fail(ServerActions.loginFail);
	},

	/**
	 *
	 */
	logout () {
		AppDispatcher.dispatch({
			actionType: Constant.LOGOUT_ATTEMPT
		});

		UserApi.logout()
		.done(ServerActions.logoutSuccess);
	},

	/**
	 *
	 */
	register (credentials) {
		AppDispatcher.dispatch({
			actionType: Constant.REGISTER_ATTEMPT
		});

		UserApi.register(credentials)
		.done(ServerActions.registerSuccess)
		.fail(ServerActions.registerFail);
	},

	/**
	 * Projects
	 */
	fetchProjects () {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_PROJECTS_ATTEMPT
		});

		ProjectApi.fetchProjects()
		.done(ServerActions.fetchProjectsSuccess);
	},

	/**
	 *
	 */
	selectProject (project) {
		AppDispatcher.dispatch({
			actionType: Constant.SELECT_PROJECT,
			project
		});
	},

	/**
	 *
	 */
	createProject (project) {
		if (!project) {
			project = {
				number: Math.floor(Math.random() * 1000),
				name: 'Project Name',
				scope: 'solo',
				description: 'Project Description',
				deadline: (+new Date) + (1000 * 60 * 60 * 24 * 7),
				requirements: ['Build a project'],
				extensions: ['Add a backend'],
				help: ['www.google.com'],
				teams: []
			};
		}
		
		AppDispatcher.dispatch({
			actionType: Constant.CREATE_PROJECT_ATTEMPT,
			project
		});

		ProjectApi.createProject(project)
		.done(ServerActions.createProjectSuccess)
		.fail(ServerActions.createProjectFail);
	},

	/**
	 *
	 */
	updateProject (projectId, project) {
		AppDispatcher.dispatch({
			actionType: Constant.UPDATE_PROJECT_ATTEMPT,
			projectId,
			project
		});

		ProjectApi.updateProject(projectId, project)
		.done(ServerActions.updateProjectSuccess)
		.fail(ServerActions.fail);
	},

	/**
	 *
	 */
	deleteProject (projectId) {
		AppDispatcher.dispatch({
			actionType: Constant.DELETE_PROJECT_ATTEMPT,
			projectId
		});

		ProjectApi.deleteProject(projectId)
		.done(ServerActions.deleteProjectSuccess)
		.fail(ServerActions.deleteProjectFail);
	},

	/**
	 *
	 */
	showCreateProject () {
		AppDispatcher.dispatch({
			actionType: Constant.SHOW_CREATE_PROJECT
		});
	},

	/**
	 * Users
	 */
	fetchUsers () {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_USERS_ATTEMPT
		});

		UserApi.fetchUsers()
		.done(ServerActions.fetchUsersSuccess);
	},

	/**
	 *
	 */
	selectUser (username) {
		AppDispatcher.dispatch({
			actionType: Constant.SELECT_USER,
			username
		});
	},

	/**
	 * Teams
	 */
	fetchTeams () {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_TEAMS_ATTEMPT
		});

		TeamApi.fetchTeams()
		.done(ServerActions.fetchTeamsSuccess)
		.fail(ServerActions.fetchTeamsFail);
	},

	/**
	 *
	 */
	createTeam (team) {
		AppDispatcher.dispatch({
			actionType: Constant.CREATE_TEAM_ATTEMPT,
			team
		});

		TeamApi.createTeam(team)
		.done(ServerActions.createTeamSuccess)
		.fail(ServerActions.fail);
	}
};