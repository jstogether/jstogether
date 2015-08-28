import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';

export default {
	/**
	 * Session
	 */
	loginSuccess (user) {
		AppDispatcher.dispatch({
			actionType: Constant.LOGIN_SUCCESS,
			user
		});
	},

	/**
	 *
	 */
	loginFail (err) {
		AppDispatcher.dispatch({
			actionType: Constant.LOGIN_FAIL,
			err
		});
	},

	/**
	 *
	 */
	registerSuccess (user) {
		AppDispatcher.dispatch({
			actionType: Constant.LOGIN_SUCCESS,
			user
		});
	},

	/**
	 *
	 */
	registerFail (err) {
		AppDispatcher.dispatch({
			actionType: Constant.REGISTER_FAIL,
			err
		});
	},

	/**
	 *
	 */
	logoutSuccess () {
		AppDispatcher.dispatch({
			actionType: Constant.LOGOUT_SUCCESS
		});
	},

	/**
	 * Projects
	 */
	fetchProjectsSuccess (projects) {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_PROJECTS_SUCCESS,
			projects
		});
	},

	/**
	 *
	 */
	createProjectSuccess (project) {
		AppDispatcher.dispatch({
			actionType: Constant.CREATE_PROJECT_SUCCESS,
			project
		});
	},

	/**
	 *
	 */
	createProjectFail (err) {
		AppDispatcher.dispatch({
			actionType: Constant.CREATE_PROJECT_FAIL,
			err
		});
	},

	/**
	 *
	 */
	deleteProjectSuccess (project) {
		AppDispatcher.dispatch({
			actionType: Constant.DELETE_PROJECT_SUCCESS,
			project
		});
	},

	/**
	 *
	 */
	deleteProjectFail (project) {
		AppDispatcher.dispatch({
			actionType: Constant.DELETE_PROJECT_FAIL,
			project
		});
	},

	/**
	 *
	 */
	updateProjectSuccess (project) {
		AppDispatcher.dispatch({
			actionType: Constant.UPDATE_PROJECT_SUCCESS,
			project
		});
	},

	/**
	 * Users
	 */
	fetchUsersSuccess (users) {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_USERS_SUCCESS,
			users
		});
	},

	/**
	 * Teams
	 */
	fetchTeamsSuccess (teams) {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_TEAMS_SUCCESS,
			teams
		});
	},

	/**
	 *
	 */
	fetchTeamsFail () {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_TEAMS_FAIL
		});
	},

	/**
	 *
	 */
	createTeamSuccess (team) {
		AppDispatcher.dispatch({
			actionType: Constant.CREATE_TEAM_SUCCESS,
			team
		});
	},

	/**
	 *
	 */
	deleteTeamSuccess (team) {
		AppDispatcher.dispatch({
			actionType: Constant.DELETE_TEAM_SUCCESS,
			team
		});
	},

	/**
	 *
	 */
	updateTeamSuccess (team) {
		console.log('update success', team);
		AppDispatcher.dispatch({
			actionType: Constant.UPDATE_TEAM_SUCCESS,
			team
		});
	},

	/**
	 *
	 */
	joinTeamSuccess () {
		AppDispatcher.dispatch({
			actionType: Constant.JOIN_TEAM_SUCCESS
		});
	},

	/**
	 *
	 */
	leaveTeamSuccess () {
		AppDispatcher.dispatch({
			actionType: Constant.LEAVE_TEAM_SUCCESS
		});
	}
};