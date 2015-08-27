import AppDispatcher from '../dispatcher/app';
import Constant from '../constant/app';
import Store from './store';

class TeamStore extends Store {
	/**
	 *
	 */
	constructor () {
		super();
		
		this.data = {
			teams: []
		};
	}

	/**
	 *
	 */
	getByProjectId (projectId) {
		return this.data.teams.filter(team => team.projectId === projectId);
	}

	/**
	 *
	 */
	getTeams () {
		return this.data.teams;
	}

	/**
	 *
	 */
	onFetchTeamsSuccess (teams) {
		this.data.teams = teams;
		this.emitChange();
	}

	/**
	 *
	 */
	onCreateTeamSuccess (team) {
		this.data.teams.push(team);
		this.emitChange();
	}

	/**
	 *
	 */
	onUpdateTeamSuccess (team) {
		for (let i = 0, len = this.data.teams.length; i < len; i += 1) {
			if (this.data.teams[i].id === team.id) {
				this.data.teams.splice(i, 1, team);

				return this.emitChange();
			}
		}
	}

	/**
	 *
	 */
	onDeleteTeamSuccess (team) {
		for (let i = 0, len = this.data.teams.length; i < len; i += 1) {
			if (this.data.teams[i].id === team.id) {
				this.data.teams.splice(i, 1);

				return this.emitChange();
			}
		}
	}
};

let teamStore = new TeamStore();

AppDispatcher.register((action) => {
	switch (action.actionType) {
	case Constant.DUMP_STORE:
		if (action.store === 'Team') {
			teamStore.dumpToConsole();
		}
	break;
	case Constant.FETCH_TEAMS_SUCCESS:
		teamStore.onFetchTeamsSuccess(action.teams);
	break;
	case Constant.CREATE_TEAM_SUCCESS:
		teamStore.onCreateTeamSuccess(action.team);
	break;
	case Constant.UPDATE_TEAM_SUCCESS:
		teamStore.onUpdateTeamSuccess(action.team);
	break;
	case Constant.DELETE_TEAM_SUCCESS:
		teamStore.onDeleteTeamSuccess(action.team);
	break;
	}
});

export default teamStore;
