import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import UserProfile from './userProfile';

import UserStore from '../store/user';

function getState () {
	return {
		currentUser: UserStore.getCurrentUser(),
		users: UserStore.getUsers()
	};
}

export default class Users extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onStoreChange');

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		UserStore.addChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		UserStore.removeChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	render () {
		const userList = this.state.users.map((user, i) => {
			return (
				<li key={i} className='itemShort' onClick={this.createOnUserClickHandler(user)}>
					<span>{user.username}</span>
				</li>
			);
		});

		return (
			<div className='pageContainer'>
				<div className='listContainer'>
					<ul className='list' onClick={this.onProjectClick}>
						<li className='itemShort rootItem' onClick={this.createOnUserClickHandler(null)}>
							<span>{'Users'}</span>
						</li>

						{userList}
					</ul>
				</div>

				<div className={'contentContainer'}>
					<UserProfile user={this.state.currentUser} />
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	onStoreChange () {
		this.setState(getState());
	}

	/**
	 *
	 */
	createOnUserClickHandler (user) {
		return () => {
			AppActions.selectUser(user);
		};
	}
}
