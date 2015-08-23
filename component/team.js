import React from 'react'
import Component from './component';

import UserShort from './userShort';
import UserStore from '../store/user';

export default class Team extends Component {
	/**
	 *
	 */
	render () {
		let team = this.props.team;
		let users = UserStore.getMulti(team.users).map(user => <UserShort user={user} />);

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
			</div>
		);
	}
}
