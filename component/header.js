import React from 'react'
import Component from './component';

import Navigation from './navigation';
import UserInfo from './userInfo';

import UserStore from '../store/user';

export default class Header extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onUserStoreChange');

		this.state = UserStore.getAll();
	}

	/**
	 *
	 */
	componentDidMount () {
		UserStore.addChangeListener(this.onUserStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		UserStore.removeChangeListener(this.onUserStoreChange);
	}

	/**
	 *
	 */
	render () {
		return (
			<header>
				<div className='left'>
					<UserInfo />
				</div>
				<div className='mid'>
					<h1>{'jstogether'}</h1>
					<Navigation currentPage={this.props.page} />
				</div>
				<div className='right'>
				</div>
			</header>
		);
	}

	/**
	 *
	 */
	onUserStoreChange () {
		this.setState(UserStore.getAll());
	}
}
