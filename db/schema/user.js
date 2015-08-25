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
UserSchema.statics.get = function (username, done) {
	this.findOne({username}, done);
};

/**
 *
 */
UserSchema.statics.findOrCreate = function (conditions, doc, options, callback) {
	if (arguments.length < 4) {
		if (typeof options === 'function') {
			// Scenario: findOrCreate(conditions, doc, callback)
			callback = options;
			options = {};
		}
		else if (typeof doc === 'function') {
			// Scenario: findOrCreate(conditions, callback);
			callback = doc;
			doc = {};
			options = {};
		}
	}

	this.findOne(conditions, (err, result) => {
		if (err || result) {
			if (options && options.upsert && !err) {
				this.update(conditions, doc, (err, count) => {
					this.findOne(conditions, (err, result) => {
						callback(err, result, false);
					});
				});
			}
			else {
				callback(err, result, false)
			}
		}
		else {
			for (var key in doc) {
				conditions[key] = doc[key]; 
			}

			var obj = new this(conditions)

			obj.save(err => {
				callback(err, obj, true);
			});
		}
	});
};

export default UserSchema;