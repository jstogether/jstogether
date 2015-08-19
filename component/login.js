import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import UserStore from '../store/user';

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
			'onUserStoreChange',
			'onUsernameChange',
			'onPasswordChange'
		);

		this.state = {
			username: 'Dave',
			password: 'abcd',
			err: null
		};
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
		let err = this.state.err ? <span className='error'>{this.state.err}</span> : null;

		return (
			<div className='loginForm' onKeyUp={this.onKeyUp}>
				<input 
					type='text'
					ref='username'
					className='login'
					placeholder='Username'
					value='Dave'
					onChange={this.onUsernameChange} />
				<input
					type='password'
					ref='password'
					className='password'
					placeholder='Password'
					value='abcd'
					onChange={this.onPasswordChange} />
				<br />

				<button onClick={this.onLoginClick} className='login'>{'Login'}</button>
				<button onClick={this.onRegisterClick} className='register'>{'Register'}</button>
				<br />
				{err}
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

		this.setState({
			username: React.findDOMNode(this.refs.username).value,
			password: React.findDOMNode(this.refs.password).value
		});
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
	onUserStoreChange () {
		this.setState({
			err: UserStore.getError()
		});
	}
}
