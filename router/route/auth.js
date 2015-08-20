import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GithubStrategy} from 'passport-github';
import path from 'path';
import bcrypt from 'bcrypt';
import React from 'react';
import db from '../../db';

let User = db.model('User');
let router = express.Router();

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => User.findOne({username}, done));



/*******************************************/
/**  LOCAL STRATEGY - USERNAME/PASSWORD   **/
/*******************************************/
passport.use('local', new LocalStrategy((username, password, done) => {
	User.get(username, (err, user) => {
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

			return done(null, user);
		});
	});
}));

router.post('/register', (req, res) => {
	let user = {
		username: req.body.username,
		password: req.body.password
	};

	User.create(user, (err, user) => {
		if (err) {
			let status = err.code === 11000 ? 409 : 500;
			return res.sendStatus(status);
		}

		passport.authenticate('local')(req, res, () => {
			req.logIn(req.user, (err) => {
				if (err) res.status(403).send(err);
				return res.send(req.user.toClient());
			});
		});
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	req.logIn(req.user, (err) => {
		if (err) res.status(403).send(err);
		return res.send(req.user.toClient());
	});
});



/********************************/
/**  OAUTH2 STRATEGY - GITHUB  **/
/********************************/
passport.use('github', new GithubStrategy({
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: 'http://www.jstogether.com/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
	const user = {
		username: profile.username,
		fullName: profile.displayName
	};

	if (profile.emails) {
		user.email = profile.emails[0].value;
	}

	User.findOrCreate({username: user.username}, user, done);
}));


router.get('/github', passport.authenticate('github', {
	scope: 'user:email'
}));
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
	req.login(req.user, (err) => {
		return res.redirect('/');
	});
});





router.all('/logout', (req, res) => {
	req.logout();

	res.send({
		logout: true
	});
});

export default router;