import React from 'react'
import Component from './component';

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
			'renderJoinLeaveButton'
		);
	}

	/**
	 *
	 */
	render () {
		const team = this.props.team;
		const users = UserStore.getMulti(team.users).map(user => <UserShort user={user} />);
		const button = this.renderJoinLeaveButton();

		return (
			<div className='team'>
				<h3>{team.name}</h3>
				<table className='keyvalue'>
					<tbody>
						<tr>
							<th><span>{'Github Repository:'}</span></th>
							<td><span>{team.githubUrl || '<none>'}</span></td>
						</tr><tr>
							<th><span>{'Deployed Project:'}</span></th>
							<td><span>{team.deployedUrl || '<none>'}</span></td>
						</tr><tr>
							<th><span>{'Users:'}</span></th>
							<td><span>{users || '<none>'}</span></td>
						</tr>
					</tbody>
				</table>

				{button}
			</div>
		);
	}

	/**
	 *
	 */
	renderJoinLeaveButton () {
		let button;

		if (this.props.canJoin) {
			button = (
				<button onClick={this.onJoinTeamClick}>{'Join Team'}</button>
			);
		}

		if (this.props.canLeave) {
			button = (
				<button onClick={this.onLeaveTeamClick}>{'Leave Team'}</button>
			);
		}
		
		return button;
	}
}
