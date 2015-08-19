import notify from 'gulp-notify';

export default function () {
	let args = Array.prototype.slice.call(arguments);

	notify.onError({
		title: 'Compile Error',
		message: '<%= error %>'
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
}