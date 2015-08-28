import React from 'react'
import Component from './component';
import _ from 'lodash';

import marked from 'react-marked';
import moment from 'moment-timezone';

import Team from './team';

import AppActions from '../action/app';

import SessionStore from '../store/session';
import TeamStore from '../store/team';

const dateFormat = 'Do MMM YYYY HH:mm:ss';
const scopes = ['solo', 'peer', 'group'];


export default class ProjectOverview extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'renderProjectTitle',
			'renderProjectScope',
			'renderButtons',
			'renderDescription',
			'renderProjectSummary',
			'renderJoinProjectDialog',
			'renderTeams',
			'onNumberChange',
			'onNameChange',
			'onScopeClick',
			'toggleEditing',
			'onDescriptionChange',
			'onDeadlineChange',
			'onRequirementChange',
			'onExtensionChange',
			'onHelpChange',
			'onAddRequirementClick',
			'onAddExtensionClick',
			'onAddHelpClick',
			'onDeleteRequirementClick',
			'onDeleteExtensionClick',
			'onDeleteHelpClick',
			'onCreateTeamClick',
			'onSaveEditsClick',
			'onDeleteProjectClick',
			'onCancelEditClick',
			'onTeamStoreChange'
		);

		this.state = {
			editing: false,
		};
	}

	/**
	 *
	 */
	componentDidMount () {
		TeamStore.addChangeListener(this.onTeamStoreChange);
	}

	/**
	 *
	 */
	componentWillUnmount () {
		TeamStore.removeChangeListener(this.onTeamStoreChange);
	}

	/**
	 *
	 */
	getClassName () {
		return 'projectOverview' + (this.state.editing ? ' editing' : '');
	}

	/**
	 *
	 */
	render () {
		const editing = this.state.editing;
		const project = editing ? this.state.project : this.props.project;
		
		return (
			<div className={this.getClassName()}>
				{this.renderProjectTitle(editing, project)}

				{this.renderDescription(editing, project)}

				{this.renderProjectSummary(editing, project)}

				{this.renderTeams(editing, project)}
			</div>
		);
	}

	/**
	 *
	 */
	renderProjectTitle (editing, project) {
		const scope = this.renderProjectScope(editing, project);
		const buttons = this.renderButtons(editing, project);

		if (editing) {
			return (
				<div className='projectTitle'>
					<h2 className='title editing'>
						{'Project '}

						<input
							type='text'
							className='number textStyle'
							value={project.number}
							onChange={this.onNumberChange} />

						<span>{': '}</span>

						<input
							type='text'
							className='name textStyle'
							value={project.name}
							onChange={this.onNameChange} />
					</h2>
					{scope}
					{buttons}
				</div>
			);
		}

		return (
			<div className='projectTitle'>
				<h2 className='title'>
					{'Project ' + project.number + ': ' + project.name}
				</h2>
				{scope}
				{buttons}
			</div>
		);		
	}

	/**
	 *
	 */
	renderProjectScope (editing, project) {
		if (editing) {
			return (
				<span
					className='scope editing'
					onClick={this.onScopeClick}>
					{'(' + project.scope + ')'}
				</span>
			);
		}

		return (
			<span
				className='scope'>
				{'(' + project.scope + ')'}
			</span>
		);
	}

	/**
	 *
	 */
	renderButtons (editing, project) {
		if (!SessionStore.isAdmin()) return null;

		const buttons = [];
		const text = editing ? 'Cancel Edit' : 'Edit';
		const editButtonHandler = editing ? this.onCancelEditClick : this.toggleEditing;

		buttons.push(<button className='editBtn' onClick={editButtonHandler}>{text}</button>);

		if (editing) {
			buttons.push(<button onClick={this.onSaveEditsClick}>{'Save'}</button>);
			buttons.push(<button onClick={this.onDeleteProjectClick}>{'Delete Project'}</button>);
		}

		return buttons;
	}

	/**
	 *
	 */
	renderDescription (editing, project) {
		const content = [(
			<div className='description'>
				{marked(project.description)}
			</div>
		)];

		if (editing) {
			content.push(
				<textarea
					ref='descriptionMarkdown'
					className={'markdown editing'}
					value={project.description}
					onChange={this.onDescriptionChange} />
			);
		}

		return content;
	}

	/**
	 *
	 */
	renderProjectSummary (editing, project) {
		let deadline;
		let requirements;
		let extensions;
		let help;

		if (editing) {
			deadline = (
				<input type='text' value={project.deadline} onChange={this.onDeadlineChange} />
			);

			requirements = project.requirements.map((requirement, i) => {
				return (
					<li>
						<input type='text' value={requirement} onChange={this.onRequirementChange(i)} />
						<span className='delete' onClick={this.onDeleteRequirementClick(i)}>{'-'}</span>
					</li>
				);
			});
			extensions = project.extensions.map((extension, i) => {
				return (
					<li>
						<input type='text' value={extension} onChange={this.onExtensionChange(i)} />
						<span className='delete' onClick={this.onDeleteExtensionClick(i)}>{'-'}</span>
					</li>
				);
			});
			help = project.help.map((help, i) => {
				return (
					<li>
						<input type='text' value={help} onChange={this.onHelpChange(i)} />
						<span className='delete' onClick={this.onDeleteHelpClick(i)}>{'-'}</span>
					</li>
				);
			});
		}
		else {
			deadline = (
				<span>{moment(project.deadline).tz('utc').format(dateFormat)}</span>
			);

			requirements = project.requirements.map((requirement, i) => {
				return (
					<li>
						<span>{requirement}</span>
					</li>
				);
			});
			extensions = project.extensions.map((extension, i) => {
				return (
					<li>
						<span>{extension}</span>
					</li>
				);
			});
			help = project.help.map((help, i) => {
				return (
					<li>
						<span>{help}</span>
					</li>
				);
			});
		}

		return (
			<table className='keyvalue'>
				<tbody>
					<tr>
						<th>{'Due'}</th>
						<td>{deadline}</td>
					</tr><tr>
						<th>
							{'Base Requirements'}
							<span className='addNew' onClick={this.onAddRequirementClick}>{'+'}</span>	
						</th>
						<td>
							<ol>{requirements}</ol>
						</td>
					</tr><tr>
						<th>
							{'Extra Credit Extensions'}
							<span className='addNew' onClick={this.onAddExtensionClick}>{'+'}</span>
						</th>
						<td>
							<ol start={requirements.length}>{extensions}</ol>
						</td>
					</tr><tr>
						<th>
							{'Helpful Links'}
							<span className='addNew' onClick={this.onAddHelpClick}>{'+'}</span>
						</th>
						<td>
							<ul>{help}</ul>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	/**
	 *
	 */
	renderJoinProjectDialog (editing, project) {
		return (
			<div className='join'>
				<span>{'To get onboard with this project, either create a new Team or join an existing one!'}</span>
				<br />
				<input type='text' ref='teamName' name='teamName' placeholder='Team Name' />
				<br />
				<button onClick={this.onCreateTeamClick}>{'Create New Team'}</button>
			</div>
		);
	}

	/**
	 *
	 */
	renderTeams (editing, project) {
		let teams = TeamStore.getByProjectId(project.id);
		teams = teams.map(team => <Team team={team} />);

		const joinProjectDialog = this.renderJoinProjectDialog(editing, project);

		return [
			<h3 key='teamTitle'>{'Teams'}</h3>,
			{joinProjectDialog},
			<div key='teams' className='teams'>
				{teams}
			</div>
		];
	}

	/**
	 *
	 */
	toggleEditing () {
		const editing = !this.state.editing;

		this.setState({
			project: editing ? _.cloneDeep(this.props.project) : null,
			editing
		});
	}

	/**
	 *
	 */
	onNumberChange (e) {
		const number = e.target.value;
		const project = this.state.project;

		project.number = number;
		this._forceUpdate();
	}

	/**
	 *
	 */
	onNameChange (e) {
		const name = e.target.value;
		const project = this.state.project;

		project.name = name;
		this._forceUpdate();
	}

	/**
	 *
	 */
	onScopeClick () {
		const project = this.state.project;
		const index = scopes.indexOf(project.scope);
		const newScope = scopes[(index + 1) % scopes.length];

		project.scope = newScope;
		this._forceUpdate();
	}

	/**
	 *
	 */
	onDescriptionChange (e) {
		const description = e.target.value;
		const project = this.state.project;

		project.description = description;
		this._forceUpdate();
	}

	/**
	 *
	 */
	onDeadlineChange (e) {
		console.log('Deadline Change', arguments);
	}

	/**
	 *
	 */
	onRequirementChange (index) {
		return (e) => {
			let project = this.state.project;
			project.requirements[index] = e.target.value;
			console.log(e.target.value);
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onExtensionChange (index) {
		return (e) => {
			let project = this.state.project;
			project.extensions[index] = e.target.value;
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onHelpChange (index) {
		return (e) => {
			let project = this.state.project;
			project.help[index] = e.target.value;
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onAddRequirementClick () {
		this.state.project.requirements.push('');
		this._forceUpdate();
	}

	/**
	 *
	 */
	onAddExtensionClick () {
		this.state.project.extensions.push('');
		this._forceUpdate();
	}

	/**
	 *
	 */
	onAddHelpClick () {
		this.state.project.help.push('');
		this._forceUpdate();
	}

	/**
	 *
	 */
	onDeleteRequirementClick (i) {
		return () => {
			this.state.project.requirements.splice(i, 1);
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onDeleteExtensionClick (i) {
		return () => {
			this.state.project.extensions.splice(i, 1);
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onDeleteHelpClick (i) {
		return () => {
			this.state.project.help.splice(i, 1);
			this._forceUpdate();
		};
	}

	/**
	 *
	 */
	onSaveEditsClick () {
		const project = this.props.project;
		const clone = this.state.project;

		const update = {};

		if (clone.number !== project.number) {
			update.number = project.number = clone.number;
		}
		if (clone.name !== project.name) {
			update.name = project.name = clone.name;
		}
		if (clone.scope !== project.scope) {
			update.scope = project.scope = clone.scope;
		}
		if (clone.deadline !== project.deadline) {
			update.deadline = project.deadline = clone.deadline;
		}
		if (clone.description !== project.description) {
			update.description = project.description = clone.description;
		}

		clone.requirements.forEach((requirement, i) => {
			if (project.requirements[i] !== requirement) {
				update.requirements = clone.requirements;
				return false;
			}
		});

		clone.extensions.forEach((extension, i) => {
			if (project.extensions[i] !== extension) {
				update.extensions = clone.extensions;
				return false;
			}
		});

		clone.help.forEach((help, i) => {
			if (project.help[i] !== help) {
				update.help = clone.help;
			}
		});

		if (Object.keys(update).length > 0) {
			AppActions.updateProject(project.id, update);
		}

		this.toggleEditing();
	}

	/**
	 *
	 */
	onDeleteProjectClick () {
		AppActions.deleteProject(this.props.project.id);
	}

	/**
	 *
	 */
	onCancelEditClick () {
		this.toggleEditing();
	}

	/**
	 *
	 */
	onCreateTeamClick () {
		const team = {
			name: React.findDOMNode(this.refs.teamName).value,
			users: [SessionStore.getUser().username],
			projectId: this.props.project.id
		};

		AppActions.createTeam(team);
	}

	/**
	 *
	 */
	onTeamStoreChange () {
		this._forceUpdate();
	}
}
