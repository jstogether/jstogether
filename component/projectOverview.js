import React from 'react'
import Component from './component';

import CreateProject from './createProject';
import AppActions from '../action/app';

export default class ProjectOverview extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('deleteProject');
	}

	/**
	 *
	 */
	render () {
		const content = [];
		const project = this.props.project;

		if (!project) {
			return this.renderGlobalOverview();
		}

		return (
			<div className='projectOverview'>
				<h1>{project.name}</h1>

				<span>
					<b>{'Scope: '}</b>
					{project.scope}
				</span>
				<br />

				<span>
					<b>{'Value: '}</b>
					{project.value}
				</span>
				<br />

				<button onClick={this.deleteProject}>{'Delete Project'}</button>
			</div>
		);
	}

	/**
	 *
	 */
	renderGlobalOverview () {
		return (
			<div className='projectOverview'>
				<h1 >{'Projects'}</h1>
				<CreateProject />
			</div>
		);
	}

	/**
	 *
	 */
	deleteProject () {
		AppActions.deleteProject(this.props.project.id);
	}
}
