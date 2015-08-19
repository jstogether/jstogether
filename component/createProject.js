import React from 'react'
import RadioGroup from 'react-radio-group';
import Component from './component';

import AppActions from '../action/app';

export default class CreateProject extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onNameChange', 'onScopeChange', 'onValueChange', 'onCreateProject');

		this.state = {
			name: '',
			scope: '',
			value: ''
		};
	}

	/**
	 *
	 */
	render () {
		return (
			<div className='createProject'>
				<table>
					<tbody>
						<tr>
							<td><label htmlFor='projectName'>{'Name:'}</label></td>
							<td><input name='projectName' type='text' placeholder='Project Name' onChange={this.onNameChange} /></td>
						</tr>
						<tr>
							<td><label htmlFor='scope'>{'Scope:'}</label></td>
							<td>
								<RadioGroup name='scope' onChange={this.onScopeChange} selectedValue={this.state.scope}>
									{Radio => (
										<div>
											<label><Radio value='solo' />{'Solo'}</label>
											<label><Radio value='group' />{'Group'}</label>
										</div>
									)}
								</RadioGroup>
							</td>
						</tr>
						<tr>
							<td><label htmlFor='projectValue'>{'Value:'}</label></td>
							<td><input ref='projectValue' name='projectValue' type='text' placeholder='Project Value' onChange={this.onValueChange} /></td>
						</tr>
					</tbody>
				</table>

				<button onClick={this.onCreateProject}>{'Create'}</button>
			</div>
		);
	}

	/**
	 *
	 */
	onNameChange (e) {
		this.setState({
			name: e.target.value
		});
	}

	/**
	 *
	 */
	onScopeChange (scope) {
		this.setState({
			scope
		});
	}

	/**
	 *
	 */
	onValueChange (e) {
		this.setState({
			value: e.target.value
		});
	}

	/**
	 *
	 */
	onCreateProject () {
		if (!this.state.scope) {
			// complain
			return;
		}

		AppActions.createProject(this.state);
	}
}
