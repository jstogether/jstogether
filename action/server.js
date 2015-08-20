import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';

export default {
	/**
	 *
	 */
	loginSuccess (user) {
		console.log('login success', user);
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
	 *
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
	fetchUsersSuccess (users) {
		AppDispatcher.dispatch({
			actionType: Constant.FETCH_USERS_SUCCESS,
			users
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

	fail (e) {
		console.log('Server Action Failed: ', e);
	}
};