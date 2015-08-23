import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import TeamSchema from './team';

let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
	name: {
		type: String,
		default: 'Project'
	},
	scope: String,
	markdown: String,
	teams: [TeamSchema]
});


/**
 *
 */
ProjectSchema.methods.toClient = function () {
	let project = {
		id: this._id,
		name: this.name,
		scope: this.scope,
		markdown: this.markdown,
		teams: this.teams
	};

	return project;
};

ProjectSchema.statics.get = function (id, done) {
	return this.findOne({_id: id}, done);
};


export default ProjectSchema;