import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import TeamSchema from './team';

let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
	/**
	 * The name of the Project
	 * EG: "Quiz", "Voting"
	 */
	name: {
		type: String,
		default: 'Project'
	},

	/**
	 * Projects will be sorted by this number
	 * EG: 1, 2, 3
	 */
	number: {
		type: Number,
		unique: true
	},

	/**
	 * UTC timestamp of when the project is due
	 * EG: 1440324902810
	 */
	deadline: Number,

	/**
	 * The scope of the project
	 * EG: "solo", "peer", "group"
	 */
	scope: {
		type: String,
		validate: /^(?:solo|peer|group)$/g
	},

	/**
	 * The introductory paragraph describing the project
	 * EG: "The goal of this project is to become accustomed to the tools we ... "
	 */
	description: String,

	/**
	 * The core requirements of the project
	 * EG: ["Build a Quiz application", "Tallies a users answers", "Provides a score", "Visible on Github", "Hosted on Heroku"]
	 */
	requirements: [String],

	/**
	 * Any potential extra-credit type extensions
	 * EG: ["Create user accounts", "Persist results to a database", "CSS animations"]
	 */
	extensions: [String],

	/**
	 * Links to helpful resources on the topics covered in this project
	 * EG: ["www.github.com/help", "www.nodejsforum"]
	 */
	help: [String],

	/**
	 * Keywords for this project
	 * EG: ["nodejs", "react", "mongodb"]
	 */
	keywords: [String],

	/**
	 * The teams that have taken on the project
	 */
	teams: [TeamSchema]
});


/**
 *
 */
ProjectSchema.methods.toClient = function () {
	let project = {
		id: this._id,
		name: this.name,
		number: this.number,
		deadline: this.deadline,
		scope: this.scope,
		description: this.description,
		requirements: this.requirements,
		extensions: this.extensions,
		help: this.help,
		keywords: this.keywords,
		teams: this.teams
	};

	return project;
};

ProjectSchema.statics.get = function (id, done) {
	return this.findOne({_id: id}, done);
};


export default ProjectSchema;