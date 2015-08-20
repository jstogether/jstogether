import React from 'react'
import Component from './component';

import marked from 'react-marked';

import CreateProject from './createProject';
import AppActions from '../action/app';

export default class ProjectOverview extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('deleteProject', 'updateMarkdown');
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

		const markdown = project.markdown ? marked(project.markdown) : null;

		return (
			<div className='projectOverview'>
				<div className='contentContainer'>
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

					<div className='markdown'>
						{markdown}
					</div>

					<textarea ref='markdownValue' />
					<button onClick={this.updateMarkdown}>{'Save'}</button>

					<button onClick={this.deleteProject}>{'Delete Project'}</button>
				</div>
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

	/**
	 *
	 */
	updateMarkdown () {
		let value = React.findDOMNode(this.refs.markdownValue).value;

		AppActions.updateMarkdown(this.props.project.id, value);
	}
}
