import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import SessionStore from '../store/session';

export default class Login extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'onKeyUp',
			'onLoginClick',
			'onRegisterClick',
			'onStoreChange',
			'onUsernameChange',
			'onPasswordChange'
		);

		this.state = {
			username: null,
			password: null,
			errorMessage: null
		};
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
		let err;

		if (this.state.errorMessage) {
			err = <span className='error'>{this.state.errorMessage}</span>
		}

		return (
			<div className='loginForm' onKeyUp={this.onKeyUp}>
				<input 
					type='text'
					ref='username'
					className='login'
					placeholder='Username'
					onChange={this.onUsernameChange} />
				<input
					type='password'
					ref='password'
					className='password'
					placeholder='Password'
					onChange={this.onPasswordChange} />
				<br />

				<button className='login' onClick={this.onLoginClick}>{'Login'}</button>
				<button className='register' onClick={this.onRegisterClick}>{'Register'}</button>
				<br />

				{err}
				<a href='/auth/github'>{'Log in with Github'}</a>
			</div>
		);
	}

	/**
	 *
	 */
	onKeyUp (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			e.stopPropagation();
			return this.onLoginClick();
		}
	}

	/**
	 *
	 */
	onUsernameChange (e) {
		this.setState({
			username: e.target.value
		});
	}

	/**
	 *
	 */
	onPasswordChange (e) {
		this.setState({
			password: e.target.value
		});
	}

	/**
	 *
	 */
	onLoginClick () {
		AppActions.login({
			username: this.state.username,
			password: this.state.password
		});
	}

	/**
	 *
	 */
	onRegisterClick () {
		AppActions.register({
			username: this.state.username,
			password: this.state.password
		});
	}

	/**
	 *
	 */
	onStoreChange () {
		this.setState({
			errorMessage: SessionStore.getError()
		});
	}
}
