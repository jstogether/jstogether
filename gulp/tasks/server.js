import gulp from 'gulp';
import gUtil from 'gulp-util';
import {spawn} from 'child_process';

import {server as config} from '../config';


let states = [
	gUtil.colors.gray.bgBlue('Starting'),
	gUtil.colors.gray.bgYellow('Restarting'),
	gUtil.colors.gray.bgCyan('Crashed'),
	gUtil.colors.gray.bgRed('Exiting')
];

let state = 0;
let node;

let log = () => {
	gUtil.log(states[state]);
};

let serverTask = () => {
	if (node) {
		state = 1;
		node.kill();
	}
	
	log();

	node = spawn('node', [config.execute], {stdio: 'inherit'});

	node.on('close', (errCode) => {
		if (errCode === 8) {
			state = 2;
			log();
		}
	});
};

process.on('exit', () => {
	state = 3;
	log();
	if (node) node.kill();
});

gulp.task('server', serverTask);

export default serverTask;