import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeamSchema = new Schema({
	name: {
		type: String,
		default: 'Team'
	},
	projectId: {
		type: ObjectId,
		required: true
	},
	users: {
		type: [String],
		default: []
	},
	githubUrl: {
		type: String,
		default: '<none>'
	},
	deployedUrl: {
		type: String,
		default: '<none>'
	}
});


/**
 *
 */
TeamSchema.methods.toClient = function () {
	const project = {
		id: this._id,
		name: this.name,
		users: this.users,
		projectId: this.projectId,
		githubUrl: this.githubUrl,
		deployedUrl: this.deployedUrl
	};

	return project;
};

/**
 *
 */
TeamSchema.statics.getById = function (id, done) {
	const query = {
		_id: id
	};

	return this.findOne(query, done);
};

/**
 *
 */
TeamSchema.statics.getByProjectId = function (projectId, done) {
	const query = {
		projectId
	};

	return this.find(query, done);
}

export default TeamSchema;