import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';

import AppActions from '../action/app';

// initialise stores
import UserStore from './user';
import ProjectStore from './project';

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
		if (UserStore.getAll().loggedIn) {
			this.data.page = page;
			this.emitChange();
		}
	}

	/**
	 *
	 */
	onLoginSuccess () {
		this.data.page = 'projects';

		setTimeout(AppActions.fetchProjects);

		this.emitChange();
	}

	/**
	 *
	 */
	onLogoutSuccess () {
		this.data.page = 'home';
		this.emitChange();
	}
};

let appStore = new AppStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case Constant.DUMP_STORE:
		if (action.store === 'App') {
			appStore.dumpToConsole();
		}
	break;
	case Constant.NAVIGATE:
		appStore.onNavigate(action.page);
	break;
	case Constant.LOGIN_SUCCESS:
		appStore.onLoginSuccess();
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
