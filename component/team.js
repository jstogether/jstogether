import React from 'react'
import Component from './component';

import AppActions from '../action/app';

import UserShort from './userShort';
import UserStore from '../store/user';
import SessionStore from '../store/session';

export default class Team extends Component {
	/**
	 *
	 */
	constructor () {
		super();

		this._bind(
			'renderButtons',
			'onJoinTeamClick',
			'onLeaveTeamClick',
			'onDeleteTeamClick',
			'onGithubClick',
			'onDeployedClick'
		);
	}

	/**
	 *
	 */
	render () {
		const team = this.props.team;
		const users = UserStore.getMulti(team.users).map(user => <UserShort user={user} />);
		const buttons = this.renderButtons();
		const myTeam = this.props.isMyTeam;
		const isAdmin = SessionStore.isAdmin();

		return (
			<div className='team'>
				<h3>{team.name}</h3>
				<table className='keyvalue'>
					<tbody>
						<tr>
							<th><span>{'Github Repository:'}</span></th>
							<td><span onClick={this.onGithubClick}>
								{team.githubUrl}
							</span></td>
						</tr><tr>
							<th><span>{'Deployed Project:'}</span></th>
							<td><span onClick={this.onDeployedClick}>
								{team.deployedUrl}
							</span></td>
						</tr><tr>
							<th><span>{'Users:'}</span></th>
							<td><span>{users || '<none>'}</span></td>
						</tr>
					</tbody>
				</table>

				{buttons}
			</div>
		);
	}

	/**
	 *
	 */
	renderButtons () {
		const buttons = [];

		if (this.props.canJoin) {
			buttons.push(
				<button onClick={this.onJoinTeamClick}>{'Join Team'}</button>
			);
		}

		if (this.props.isMyTeam) {
			buttons.push(
				<button onClick={this.onLeaveTeamClick}>{'Leave Team'}</button>
			);
		}

		if (this.props.isMyTeam || SessionStore.isAdmin()) {
			buttons.push(
				<button onClick={this.onDeleteTeamClick}>{'Delete'}</button>
			);
		}
		
		return buttons;
	}

	/**
	 *
	 */
	onJoinTeamClick () {
		AppActions.joinTeam(SessionStore.getUser(), this.props.team);
	}

	/**
	 *
	 */
	onLeaveTeamClick () {
		AppActions.leaveTeam(SessionStore.getUser(), this.props.team);
	}

	/**
	 *
	 */
	onDeleteTeamClick () {
		if (confirm('Really Delete Team ' + this.props.team.name)) {
			AppActions.deleteTeam(this.props.team);
		}
	}

	/**
	 *
	 */
	onGithubClick () {
		const newValue = prompt('New Github Repository:');

		if (newValue) {
			AppActions.updateTeamGithubRepository(this.props.team, newValue);
		}
	}

	/**
	 *
	 */
	onDeployedClick (e) {
		const newValue = prompt('New Deployed URL:');

		if (newValue) {
			AppActions.updateTeamDeployedUrl(this.props.team, newValue);
		}
	}
}
