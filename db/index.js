import mongoose from 'mongoose';

import UserSchema from './schema/user';
import ProjectSchema from './schema/project';

import config from '../config';

let connection = mongoose.createConnection(
	config.get('database:host'),
	config.get('database:name'),
	config.get('database:port')
);

connection.model('User', UserSchema);
connection.model('Project', ProjectSchema);

export default connection;