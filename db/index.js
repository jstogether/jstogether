import mongoose from 'mongoose';

import UserSchema from './schema/user';
import ProjectSchema from './schema/project';

let connection = mongoose.createConnection('127.0.0.1', 'jstogether-tools', 27017);

connection.model('User', UserSchema);
connection.model('Project', ProjectSchema);

export default connection;