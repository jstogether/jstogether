import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import ProjectOverview from './projectOverview';

import ProjectStore from '../store/project';

export default class Projects extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind('onProjectStoreChange');

		this.state = ProjectStore.getAll();
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
		const projectList = this.state.projects.map((project, i) => {
			return (
				<li key={i} className='projectShort' onClick={this.createOnProjectClickHandler(project)}>
					<span>{project.name}</span>
				</li>
			);
		});

		return (
			<div className='projectsContainer'>
				<div className='projectListContainer'>
					<ul className='projectList' onClick={this.onProjectClick}>
						<li className='rootProject' onClick={this.createOnProjectClickHandler(null)}>
							<span>{'Projects'}</span>
						</li>

						{projectList}
					</ul>
				</div>

				<ProjectOverview project={this.state.currentProject} />
			</div>
		);
	}

	/**
	 *
	 */
	onProjectStoreChange () {
		this.setState(ProjectStore.getAll());
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
		return () => {
			AppActions.selectProject(project);
		};
	}
}
