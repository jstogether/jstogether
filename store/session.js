import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';

import AppActions from '../action/app';

class SessionStore extends Store {
	/**
	 *
	 */
	constructor () {
		super();
		
		this.data = {
			loggedIn: false,
			error: null,
			user: null
		};
	}

	/**
	 *
	 */
	getUser () {
		return this.data.user;
	}

	/**
	 *
	 */
	isLoggedIn () {
		return this.data.loggedIn;
	}

	/**
	 *
	 */
	isAdmin () {
		return this.data.user && this.data.user.admin;
	}

	/**
	 *
	 */
	getError () {
		return this.data.error;
	}

	/**
	 *
	 */
	onLoginSuccess (user) {
		this.data.user = user;
		this.data.loggedIn = true;
		this.data.error = null;

		this.emitChange();
	}

	/**
	 *
	 */
	onLogoutSuccess () {
		this.data.user = null;
		this.data.loggedIn = false;

		this.emitChange();
	}

	/**
	 *
	 */
	onLoginFail (err) {
		switch (err.status) {
		case 401:
		case 403:
			this.data.error = 'Invalid Username or Password';
		break;
		default:
			// can this become this.data.error = err.message ?
			this.data.error = 'Unknown Error';
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
			this.data.error = 'User already exists';
		break;
		default:
			// can this become this.data.error = err.message ?
			this.data.error = 'Unknown Error';
			console.log(err);
		};

		this.emitChange();
	}

	/**
	 *
	 */
	onLogoutSuccess () {
		this.data.user = null;
		this.data.loggedIn = false;

		this.emitChange()
	}
};

let sessionStore = new SessionStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case Constant.DUMP_STORE:
		if (action.store === 'Session') {
			sessionStore.dumpToConsole();
		}
	break;
	case Constant.LOGIN_SUCCESS:
		sessionStore.onLoginSuccess(action.user);
	break;
	case Constant.LOGOUT_SUCCESS:
		sessionStore.onLogoutSuccess();
	break;
	case Constant.LOGIN_FAIL:
		sessionStore.onLoginFail(action.err);
	break;
	case Constant.REGISTER_FAIL:
		sessionStore.onRegisterFail(action.err);
	break;
	}
});

export default sessionStore;
