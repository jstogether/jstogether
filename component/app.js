import React from 'react'

import Component from './component';

import AppActions from '../action/app';
import AppStore from '../store/app';
import UserStore from '../store/user';

import Header from './header';
import Login from './login';
import About from './about';
import Projects from './projects';

function getState () {
	return {
		page: AppStore.getPage(),
		user: UserStore.getAll()
	};
}

export default class App extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onAppStoreUpdate');

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		AppStore.addChangeListener(this.onAppStoreUpdate);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		AppStore.removeChangeListener(this.onAppStoreUpdate);
	}

	/**
	 *
	 */
	render () {
		let content;
		console.log('rendering ' + this.state.page);

		switch (this.state.page) {
		case 'projects':
			content = (
				<Projects />
			);
		break;
		case 'about':
		case 'home':
			content = (
				<About />
			);
		break;
		case 'login':
		default:
			content = (
				<Login />
			);
		break;
		}

		return (
			<div className='content'>
				<Header user={this.state.user} page={this.state.page} />

				{content}
			</div>
		);
	}

	/**
	 *
	 */
	onAppStoreUpdate () {
		this.setState(getState());
	}
}