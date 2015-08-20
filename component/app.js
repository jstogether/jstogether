import React from 'react'

import Component from './component';

import AppActions from '../action/app';

import AppStore from '../store/app';
import SessionStore from '../store/session';

import Header from './header';
import Login from './login';
import About from './about';
import Projects from './projects';
import Users from './users';

function getState () {
	return {
		page: AppStore.getPage()
	};
}

export default class App extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onStoreUpdate');

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		AppStore.addChangeListener(this.onStoreUpdate);

		if (this.props.user) {
			SessionStore.onLoginSuccess(this.props.user);
			AppActions.navigate('projects');
		}
	}

	/**
	 *
	 */
	componentWillUnmount () {
		AppStore.removeChangeListener(this.onStoreUpdate);
	}

	/**
	 *
	 */
	render () {
		let content;

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
		case 'users':
			content = (
				<Users />
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
				<Header page={this.state.page} />

				{content}
			</div>
		);
	}

	/**
	 *
	 */
	onStoreUpdate () {
		this.setState(getState());
	}
}