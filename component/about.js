import React from 'react'
import Component from './component';

export default class About extends Component {
	/**
	 *
	 */
	render () {
		return (
			<div className={'pageContainer'}>
				<h1>{'About'}</h1>
				<p>{'Cool description about jstogether'}</p>
			</div>
		);
	}
}
