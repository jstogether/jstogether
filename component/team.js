import React from 'react'
import Component from './component';

import UserShort from './userShort';

export default class Team extends Component {
	/**
	 *
	 */
	render () {
		let team = this.props.team;
		let users = team.users.map(user => <UserShort user={user} />);

		return (
			<div className='team'>
				<h3>{team.name}</h3>
				<span>{'Github:'}</span><span>{team.githubUrl}</span>
				<span>{'Deployed:'}</span><span>{team.deployedUrl}</span>
				{users}
			</div>
		);
	}
}
