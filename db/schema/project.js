import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let ProjectSchema = new Schema({
	name: {
		type: String,
		default: 'Project'
	},
	scope: String,
	value: String,
	markdown: String
});

/**
 *
 */
ProjectSchema.methods.toClient = function () {
	let project = {
		id: this._id,
		name: this.name,
		scope: this.scope,
		value: this.value,
		markdown: this.markdown
	};

	return project;
};

ProjectSchema.statics.get = function (id, done) {
	return this.findOne({_id: id}, done);
};


export default ProjectSchema;