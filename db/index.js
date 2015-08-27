import mongoose from 'mongoose';

import UserSchema from './schema/user';
import ProjectSchema from './schema/project';
import TeamSchema from './schema/team';

import config from '../config';

let uri = process.env.MONGOLAB_URI;
let connection;

if (uri) {
	connection = mongoose.connect(uri);
}
else {
	connection = mongoose.createConnection(
		config.get('database:host'),
		config.get('database:name'),
		config.get('database:port')
	);
}

connection.model('User', UserSchema);
connection.model('Project', ProjectSchema);
connection.model('Team', TeamSchema);

export default connection;