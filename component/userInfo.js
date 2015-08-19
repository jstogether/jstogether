import React from 'react'
import Component from './component';

import AppActions from '../action/app';
import SessionStore from '../store/session';

function getState () {
	return {
		user: SessionStore.getUser(),
		loggedIn: SessionStore.isLoggedIn()
	};
}

export default class UserInfo extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'onStoreChange',
			'onLogoutClick',
			'onUsernameClick'
		);

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		SessionStore.addChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		SessionStore.removeChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	render () {
		let content;

		if (this.state.loggedIn) {
			content = (
				<span key='username' className='username'>
					<span className='username' onClick={this.onUsernameClick}>{this.state.user.username + ' '}</span>
					<span className='logoutButton' onClick={this.onLogoutClick}>{'(logout)'}</span>
				</span>
			);
		}

		return (
			<div className='userInfo'>
				{content}
			</div>
		);
	}

	/**
	 *
	 */
	onLogoutClick () {
		AppActions.logout();
	}

	/**
	 *
	 */
	onUsernameClick () {
		AppActions.selectUser(this.state.user);
		AppActions.navigate('users');
	}
	
	/**
	 *
	 */
	onStoreChange () {
		this.setState(SessionStore.getAll());
	}
}