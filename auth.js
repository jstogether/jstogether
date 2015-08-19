import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import db from './db';

function createHash (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use('login', new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	console.log('LOGIN:', username, password);

	db.model('User').findOne({username}, (err, user) => {
		console.log('Findone: ', user);
		if (err) return done(err);

		if (!user) {
			return done(null, false, {
				message: 'User not found.'
			});
		}

		bcrypt.compare(password, user.password, (err, result) => {
			if (err) return done(err);

			if (!result) {
				return done(null, false, {
					message: 'Incorrect password.'
				});
			}

			//return done(null, user);
			res.send(user);
		});
	});
}));

passport.use('register', new LocalStrategy({
	passReqToCallback: true
}, (req, username, password, done) => {
	console.log('REGISTER:', username, password);

	let User = db.model('User');

	//process.nextTick(() => {
		console.log('Attempting to find User');
		User.findOne({
			username
		}, (err, user) => {
			console.log('FindOne: ', user);
			if (err) return done(err);
			if (user) return done(null, false, {err: 'Pie'});

			let newUser = new User();
			newUser.username = username;
			newUser.password = createHash(password);

			console.log('CREATED USER:', newUser);
			newUser.save(err => {
				if (err) throw err;
				console.log('New user saved - calling done');
				//console.log(res);
				console.log(21);
				return done(null, newUser);
				//res.send(newUser);
			});
		});
	//});
}));


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((username, done) => db.model('User').findOne({username}, done));

module.exports = passport;