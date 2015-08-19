import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import ProjectOverview from './projectOverview';

import ProjectStore from '../store/project';

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

		this._bind('onProjectStoreChange');

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
		const projectList = this.state.projects.map((project, i) => {
			return (
				<li key={i} className='itemShort' onClick={this.createOnProjectClickHandler(project)}>
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
						</li>

						{projectList}
					</ul>
				</div>

				<div className={'contentContainer'}>
					<ProjectOverview project={this.state.currentProject} />
				</div>
			</div>
		);
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
		return () => {
			AppActions.selectProject(project);
		};
	}
}
