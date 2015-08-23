import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';
import $ from 'jquery';

class UserStore extends Store {
	/**
	 *
	 */
	constructor () {
		super();

		this.data = {
			currentUser: null,
			users: []
		};
	}

	/**
	 *
	 */
	getCurrentUser () {
		return this.data.currentUser;
	}

	/**
	 *
	 */
	getUsers () {
		return this.data.users;
	}

	/**
	 *
	 */
	get (username) {
		return this.data.users.find(user => user.username === username);
	}

	/**
	 *
	 */
	getMulti (usernames) {
		return this.data.users.filter(user => usernames.indexOf(user.username) > -1);
	}

	/**
	 *
	 */
	onSelectUser (username) {
		this.data.currentUser = this.data.users.find(user => user.username === username);
		this.emitChange();
	}

	/**
	 *
	 */
	onFetchUsersSuccess (users) {
		this.data.users = users;

		this.emitChange();
	}

	/**
	 *
	 */
	onLogout () {
		this.data.currentUser = null;
	}
}

let userStore = new UserStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case Constant.DUMP_STORE:
		if (action.store === 'User') {
			userStore.dumpToConsole();
		}
	break;
	case Constant.LOGOUT_SUCCESS:
		userStore.onLogout();
	break;
	case Constant.SELECT_USER:
		userStore.onSelectUser(action.username);
	break;
	case Constant.FETCH_USERS_SUCCESS:
		userStore.onFetchUsersSuccess(action.users);
	break;
	}
});

export default userStore;
