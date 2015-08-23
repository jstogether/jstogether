import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';

import AppActions from '../action/app';

// initialise stores
import UserStore from './user';
import ProjectStore from './project';
import SessionStore from './session';

class AppStore extends Store {
	/**
	 *
	 */
	constructor () {
		super();
		
		this.data = {
			page: 'login'
		};
	}

	/**
	 *
	 */
	getPage () {
		return this.data.page;
	}

	/**
	 *
	 */
	onNavigate (page) {
		if (SessionStore.isLoggedIn()) {
			this.data.page = page;
			this.emitChange();
		}
	}

	/**
	 *
	 */
	onLoginSuccess (user) {
		this.data.page = 'projects';

		// this needs to be done properly
		setTimeout(AppActions.fetchProjects);
		setTimeout(AppActions.fetchUsers);

		this.emitChange();
	}

	/**
	 *
	 */
	onLogoutSuccess () {
		this.data.page = 'login';

		this.emitChange();
	}
};

let appStore = new AppStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case void 0:
		console.warn('undefined Action Triggered', action);
	break;
	case Constant.DUMP_STORE:
		if (action.store === 'App') {
			appStore.dumpToConsole();
		}
	break;
	case Constant.NAVIGATE:
		appStore.onNavigate(action.page);
	break;
	case Constant.LOGIN_SUCCESS:
		appStore.onLoginSuccess(action.user);
	break;
	case Constant.LOGOUT_SUCCESS:
		appStore.onLogoutSuccess();
	break;
	case Constant.ECHO:
		console.log(action.message);
	break;
	}
});

export default appStore;
