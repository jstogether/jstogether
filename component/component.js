import React from 'react';


export default class Component extends React.Component {
	/**
	 * React.createClass used to bind methods automatically and efficiently, but this is
	 * lost when using ES6 classes.  At least until ES7 property initialisers:
	 * https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html
	 * For now, we'll just provide this function to bind everything in the constructor.
	 * This method was stolen from here, btw:
	 * http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
	 */
	_bind(...methods) {
		methods.forEach((method) => {
			this[method] = this[method].bind(this);
		});

		this._forceUpdate = this.forceUpdate.bind(this, null);
	}
}