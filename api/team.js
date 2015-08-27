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
	}
}