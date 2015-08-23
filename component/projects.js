import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import ProjectOverview from './projectOverview';
import CreateProject from './createProject';

import ProjectStore from '../store/project';
import SessionStore from '../store/session';

function getState () {
	return {
		currentProject: ProjectStore.getCurrentProject(),
		projects: ProjectStore.getProjects()
	};
}

export default class Projects extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'renderCurrentProject',
			'onProjectStoreChange',
			'onCreateProjectClick'
		);

		this.state = getState();
	}

	/**
	 *
	 */
	componentDidMount () {
		ProjectStore.addChangeListener(this.onProjectStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		ProjectStore.removeChangeListener(this.onProjectStoreChange);
	}

	/**
	 *
	 */
	render () {
		const currentProject = this.state.currentProject;
		const renderedProject = this.renderCurrentProject();
		const createProjectBtn = SessionStore.isAdmin() ? <button onClick={this.onCreateProjectClick}>{'New'}</button> : null;
		
		const projectList = this.state.projects.map((project, i) => {
			const selectedProject = project === currentProject ? ' selected' : '';

			return (
				<li key={i} className={'itemShort' + selectedProject} onClick={this.createOnProjectClickHandler(project)}>
					<span>{project.name}</span>
				</li>
			);
		});

		return (
			<div className='pageContainer'>
				<div className='listContainer'>
					<ul className='list' onClick={this.onProjectClick}>
						<li className='itemShort rootItem' onClick={this.createOnProjectClickHandler(null)}>
							<span>{'Projects'}</span>
							{createProjectBtn}
						</li>

						{projectList}
					</ul>
				</div>

				<div className={'contentContainer'}>
					{renderedProject}
				</div>
			</div>
		);
	}

	/**
	 *
	 */
	renderCurrentProject () {
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
	onCreateProjectClick (e) {
		e.stopPropagation();

		AppActions.createProject();
	}

	/**
	 *
	 */
	onProjectStoreChange () {
		this.setState(getState());
	}

	/**
	 *
	 */
	onClick () {
		AppActions.dumpStore('Project');
	}

	/**
	 *
	 */
	createOnProjectClickHandler (project) {
		return (e) => {
			AppActions.selectProject(project);
		};
	}
}
