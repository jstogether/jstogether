import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {OAuth2Strategy} from 'passport-oauth';
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
passport.use('github', new OAuth2Strategy({
	authorizationURL: 'https://github.com/login/oauth/authorize',
	tokenURL: 'https://github.com/login/oauth/access_token',
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackUrl: 'http://www.jstogether.com/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
	console.log('accessToken', accessToken);
	console.log('refreshToken', refreshToken);
	console.log('profile', profile);

	done('error!');
}));


router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', (req, res) => {
	res.send({
		awesome: true
	});
}));





router.all('/logout', (req, res) => {
	req.logout();
	res.send({
		logout: true
	});
});

export default router;