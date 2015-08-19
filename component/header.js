import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import Navigation from './navigation';
import UserInfo from './userInfo';

export default class Header extends Component {
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
					<h1 onClick={this.onClickTitle}>{'jstogether'}</h1>
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
	onClickTitle () {
		AppActions.navigate('home');
	}
}
