import ServerActions from '../action/server';
import $ from 'jquery';

export default {
	/**
	 *
	 */
	fetchTeams () {
		return $.get('/team');
	},

	/**
	 *
	 */
	createTeam (team) {
		return $.post(`/team/`, team);
	},

	/**
	 *
	 */
	deleteTeam (team) {
		return $.ajax(`/team/${team.id}/`, {
			method: 'DELETE'
		});
	},

	/**
	 *
	 */
	updateTeam (team) {
		return $.ajax(`/team/${team.id}/`, {
			method: 'PUT',
			data: team
		});
	},

	/**
	 *
	 */
	joinTeam (user, team) {
		return $.ajax(`/team/${team.id}/join`, {
			method: 'PUT'
		});
	},

	/**
	 *
	 */
	leaveTeam (user, team) {
		return $.ajax(`/team/${team.id}/leave`, {
			method: 'PUT'
		});
	}
}