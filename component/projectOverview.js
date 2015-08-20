import React from 'react'
import Component from './component';
import _ from 'lodash';
import marked from 'react-marked';

import AppActions from '../action/app';

import SessionStore from '../store/session';


export default class ProjectOverview extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'renderEditView',
			'toggleEditing',
			'onNameChange',
			'toggleScope',
			'onMarkdownChange',
			'saveEdits',
			'deleteProject'
		);

		this.state = {
			editing: false,
		};
	}

	/**
	 *
	 */
	render () {
		const content = [];
		const project = this.props.project;
		const edit = SessionStore.isAdmin() ? <span className={'editBtn'} onClick={this.toggleEditing}>{'[edit]'}</span> : null;

		if (this.state.editing) {
			return this.renderEditView()
		}

		const markdown = project.markdown ? marked(project.markdown) : null;

		return (
			<div className='projectOverview'>
				<h1>{project.name}</h1>
				<span className={'scope'}>{'(' + project.scope + ')'}</span>
				{edit}
				<br />

				<div className='markdown'>
					{markdown}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	renderEditView () {
		const content = [];
		const markdown = this.state.markdown ? marked(this.state.markdown) : null;

		return (
			<div className='projectOverview editing'>
				<h1 contentEditable={true} onKeyUp={this.onNameChange}>{this.state.name}</h1>
				<span className={'scope'} onClick={this.toggleScope}>{'(' + this.state.scope + ')'}</span>
				<br />

				<div className='markdown'>
					{markdown}
				</div>

				<textarea
					contentEditable={true}
					ref='markdownValue'
					className={'markdown'}
					value={this.state.markdown}
					onChange={this.onMarkdownChange} />


				<button onClick={this.saveEdits}>{'Save'}</button>
				<button onClick={this.deleteProject}>{'Delete Project'}</button>
				<button onClick={this.toggleEditing}>{'Cancel Editing'}</button>
			</div>
		);
	}

	/**
	 *
	 */
	toggleEditing () {
		let project = this.props.project;
		let editing = !this.state.editing;
		let newScope = {};

		newScope.editing = editing;
		newScope.name = editing ? project.name : null;
		newScope.scope = editing ? project.scope : null;
		newScope.markdown = editing ? project.markdown: null;

		this.setState(newScope);
	}

	/**
	 *
	 */
	onNameChange (e) {
		let name = e.target.innerText;

		this.setState({
			name
		});
	}

	/**
	 *
	 */
	toggleScope () {
		let scope = this.state.scope;

		scope = scope === 'solo' ? 'group' : 'solo';

		this.setState({
			scope
		});
	}

	/**
	 *
	 */
	onMarkdownChange (e) {
		let markdown = e.target.value;

		this.setState({
			markdown
		});
	}

	/**
	 *
	 */
	saveEdits () {
		// TODO: do this properly.
		// I'm changing values in the `project` object directly
		// just to prevent flashing the OLD data between the time the
		// request is sent to the server and the time the store triggers
		// a change event sending us the NEW data.
		let project = this.props.project;

		if (this.state.name !== project.name) {
			project.name = this.state.name;
			AppActions.updateProjectName(project.id, this.state.name);
		}

		if (this.state.scope !== project.scope) {
			project.scope = this.state.scope;
			AppActions.updateProjectScope(project.id, this.state.scope);
		}

		if (this.state.markdown !== project.markdown) {
			project.markdown = this.state.markdown;
			AppActions.updateProjectMarkdown(project.id, this.state.markdown);
		}

		this.toggleEditing();
	}

	/**
	 *
	 */
	deleteProject () {
		AppActions.deleteProject(this.props.project.id);
	}
}
