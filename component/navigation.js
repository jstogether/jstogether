import React from 'react'
import Component from './component';

import AppActions from '../action/app';

export default class Navigation extends Component {
	/**
	 *
	 */
	render () {
		return (
			<div className='navigation'>
				<span onClick={this.onNavigate('projects')}>{'Projects'}</span>
				<span onClick={this.onNavigate('users')}>{'Users'}</span>
				<span onClick={this.onNavigate('about')}>{'About'}</span>
			</div>
		);
	}

	/**
	 *
	 */
	onNavigate (page) {
		return () => AppActions.navigate(page);
	}
}
