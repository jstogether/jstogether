import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;
let UserSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	email: String
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
		email: this.email
	};

	return JSON.stringify(user);
};

/**
 *
 */
UserSchema.statics.get = function (username, done) {
	this.findOne({username}, done);
};

export default UserSchema;