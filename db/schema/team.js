import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TeamSchema = new Schema({
	name: {
		type: String,
		default: 'Team'
	},
	users: [String]
});


/**
 *
 */
TeamSchema.methods.toClient = function () {
	let project = {
		id: this._id,
		name: this.name,
		users: this.users
	};

	return project;
};

TeamSchema.statics.get = function (id, done) {
	return this.findOne({_id: id}, done);
};


export default TeamSchema;