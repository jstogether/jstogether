import React from 'react';
import Page from './page';

import AppActions from '../action/app';

import ProjectStore from '../store/project';
import SessionStore from '../store/session';

import ProjectOverview from './projectOverview';

function getState () {
	return {
		currentProject: ProjectStore.getCurrentProject(),
		projects: ProjectStore.getProjects()
	};
}

export default class Projects extends Page {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'renderHeaderItem',
			'renderItem',
			'renderContent',
			'generateItemClickHandler',
			'onCreateProjectClick',
			'onStoreChange'
		);

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		ProjectStore.addChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		ProjectStore.removeChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	render () {
		return this.renderPage({
			items: this.state.projects,
			selectedItem: this.state.currentProject
		});
	}

	/**
	 *
	 */
	renderHeaderItem () {
		const createProjectBtn = SessionStore.isAdmin() ?
			<button onClick={this.onCreateProjectClick}>{'New'}</button> :
			null;

		return [
			<span>{'Projects'}</span>,
			{createProjectBtn}
		];
	}

	/**
	 *
	 */
	renderItem (project) {
		return (
			<span>{project.name}</span>
		);
	}

	/**
	 *
	 */
	renderContent () {
		const project = this.state.currentProject;

		if (!project) {
			return (
				<div><span>{'Nothing to see here...'}</span></div>
			);
		}
		else if (project === 'createNew') {
			return (
				<div className='projectOverview'>
					<h1 >{'Projects'}</h1>
					<CreateProject />
				</div>
			);
		}

		return (
			<ProjectOverview key={project.id} project={project} />
		);
	}

	/**
	 *
	 */
	generateItemClickHandler (project) {
		return (e) => {
			AppActions.selectProject(project);
		}
	}

	/**
	 *
	 */
	onCreateProjectClick (e) {
		e.stopPropagation();

		AppActions.createProject();
	}

	/**
	 *
	 */
	onStoreChange () {
		this.setState(getState());
	}
}