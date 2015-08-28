import React from 'react';
import Page from './page';

import AppActions from '../action/app';

import ProjectStore from '../store/project';
import SessionStore from '../store/session';
import TeamStore from '../store/team';

import ProjectOverview from './projectOverview';

function getState () {
	const currentProject = ProjectStore.getCurrentProject();
	const username = SessionStore.getUser().username;
	const projects = ProjectStore.getProjects();
	let userTeam;

	if (currentProject) {
		const teams = TeamStore.getByProjectId(currentProject.id);

		teams.every(team => {
			if (team.users.indexOf(username) > -1) {
				userTeam = team;
				return false;
			}

			return true;
		});
	}

	return {
		currentProject,
		projects,
		userTeam
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
		TeamStore.addChangeListener(this.onStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		ProjectStore.removeChangeListener(this.onStoreChange);
		TeamStore.removeChangeListener(this.onStoreChange);
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

		return (
			<ProjectOverview key={project.id} project={project} userTeam={this.state.userTeam} />
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