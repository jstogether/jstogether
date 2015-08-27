import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	email: String,
	admin: Boolean,
	githubUrl: String,
	fullName: String,
	location: String,
	avatarUrl: String
});

/**
 *
 */
UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err);

			this.password = hash;
			return next();
		});
	});
});

/**
 *
 */
UserSchema.methods.toClient = function () {
	let user = {
		username: this.username,
		email: this.email,
		githubUrl: this.githubUrl,
		fullName: this.fullName,
		location: this.location,
		avatarUrl: this.avatarUrl
	};

	if (this.admin) {
		user.admin = this.admin;
	}

	return user;
};

/**
 *
 */
UserSchema.statics.getByUsername = function (username, done) {
	this.findOne({username}, done);
};

/**
 *
 */
UserSchema.statics.findOrCreate = function (query, doc, options, done) {
	if (arguments.length < 4) {
		if (typeof options === 'function') {
			// Scenario: findOrCreate(query, doc, done)
			done = options;
			options = {};
		}
		else if (typeof doc === 'function') {
			// Scenario: findOrCreate(query, done);
			done = doc;
			doc = {};
			options = {};
		}
	}

	this.findOne(query, (err, user) => {
		if (err || user) {
			if (options && options.upsert && !err) {
				this.update(query, doc, (err, count) => {
					this.findOne(query, (err, user) => {
						done(err, user, false);
					});
				});
			}
			else {
				done(err, user, false)
			}
		}
		else {
			for (var key in doc) {
				query[key] = doc[key]; 
			}

			var obj = new this(query)

			obj.save(err => {
				done(err, obj, true);
			});
		}
	});
};

export default UserSchema;