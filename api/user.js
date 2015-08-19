import ServerActions from '../action/server';
import $ from 'jquery';

export default {
	/**
	 *
	 */
	login (credentials) {
		return $.post('/auth/login', credentials);
	},

	/**
	 *
	 */
	register (credentials) {
		return $.post('/auth/register', credentials);
	},

	/**
	 *
	 */
	logout () {
		return $.get('/auth/logout');
	}
}