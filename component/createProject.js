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

		this._bind(
			'onNameChange',
			'onScopeChange',
			'onMarkdownChange',
			'onCreateProject'
		);

		this.state = {
			name: '',
			scope: '',
			markdown: ''
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
							<td>
								<input
									name='projectName'
									type='text'
									placeholder='Project Name'
									onChange={this.onNameChange} />
							</td>
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
							<td><label htmlFor='projectMarkdown'>{'Markdown:'}</label></td>
							<td>
								<textarea
									ref='projectMarkdown'
									name='projectMarkdown'
									placeholder='Project Markdown'
									onChange={this.onMarkdownChange} />
							</td>
						</tr>
						<tr>
							<td colSpan={2} className='buttons'>
								<button onClick={this.onCreateProject}>{'Create'}</button>
							</td>
						</tr>
					</tbody>
				</table>
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
	onMarkdownChange (e) {
		this.setState({
			markdown: e.target.value
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
