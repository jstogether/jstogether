import React from 'react'
import Component from './component';

import AppActions from '../action/app';

export default class UserShort extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onClick');
	}
	
	/**
	 *
	 */
	render () {
		return (
			<span className='userShort' onClick={this.onClick}>{this.props.user.username}</span>
		);
	}

	/**
	 *
	 */
	onClick () {
		AppActions.selectUser(this.props.user.username);
		AppActions.navigate('users');
	}
}
