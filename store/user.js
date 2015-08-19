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
			username: 'Guest',
			loggedIn: false,
			loginError: null
		};
	}

	/**
	 *
	 */
	onLoginSuccess (user) {
		this.data.username = user.username;
		this.data.loggedIn = true;
		this.data.loginError = null;

		this.emitChange();
	}

	/**
	 *
	 */
	onLoginFail (err) {
		switch (err.status) {
		case 401:
		case 403:
			this.data.loginError = 'Invalid Username or Password';
		break;
		default:
			this.data.loginError = 'Unknown Error';
			console.log(err);
		}

		this.emitChange();
	}

	/**
	 *
	 */
	onRegisterFail (err) {
		switch (err.status) {
		case 409:
			this.data.loginError = 'User already exists';
		break;
		default:
			this.data.loginError = 'Unknown Error';
			console.log(err);
		};
	}

	/**
	 *
	 */
	onLogoutSuccess () {
		this.data.username = 'Guest';
		this.data.loggedIn = false;

		this.emitChange()
	}

	/**
	 *
	 */
	getError () {
		return this.data.loginError;
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
	case Constant.LOGIN_SUCCESS:
		userStore.onLoginSuccess(action.user);
	break;
	case Constant.LOGIN_FAIL:
		userStore.onLoginFail(action.err);
	break;
	case Constant.REGISTER_FAIL:
		userStore.onRegisterFail(action.err);
	break;
	case Constant.LOGOUT_SUCCESS:
		userStore.onLogoutSuccess();
	break;
	}
});

export default userStore;
