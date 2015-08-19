import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let ProjectSchema = new Schema({
	name: {
		type: String,
		default: 'Project'
	},
	scope: String,
	value: String
});


/**
 *
 */
ProjectSchema.methods.toClient = function () {
	let project = {
		id: this._id,
		name: this.name,
		scope: this.scope,
		value: this.value
	};

	return project;
};

export default ProjectSchema;