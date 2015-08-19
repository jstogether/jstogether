import { EventEmitter } from 'events';
import Constant from '../constant/app';
import $ from 'jquery';

export default class extends EventEmitter {
	/**
	 *
	 */
	constructor () {
		super();

		this.data = {};
	}

	/**
	 *
	 */
	addChangeListener (callback) {
		this.on(Constant.CHANGE, callback);
	}

	/**
	 *
	 */
	removeChangeListener (callback) {
		this.removeListener(Constant.CHANGE, callback);
	}

	/**
	 *
	 */
	getAll () {
		return this.data;
	}

	/**
	 *
	 */
	fetch () {
		return $.get(this.url);
	}

	/**
	 *
	 */
	emitChange () {
		this.emit(Constant.CHANGE);
	}

	dumpToConsole () {
		console.log(this.url, this, this.data);
	}
}