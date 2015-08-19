import React from 'react'
import Component from './component';

import AppActions from '../action/app';
import UserStore from '../store/user';

export default class UserInfo extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onChange', 'onLogoutClick');

		this.state = UserStore.getAll();
	}

	/**
	 *
	 */
	componentDidMount () {
		UserStore.addChangeListener(this.onChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		UserStore.removeChangeListener(this.onChange);
	}

	/**
	 *
	 */
	render () {
		let content;

		if (this.state.loggedIn) {
			content = (
				<span key='username' className='username'>
					{this.state.username + ' '}
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
	onChange () {
		this.setState(UserStore.getAll());
	}
}