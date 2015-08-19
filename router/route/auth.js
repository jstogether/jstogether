import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import path from 'path';
import bcrypt from 'bcrypt';
import React from 'react';
import db from '../../db';

let User = db.model('User');
let router = express.Router();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((username, done) => db.model('User').findOne({username}, done));

passport.use(new LocalStrategy((username, password, done) => {
	console.log('Login', username, password);
	User.get(username, (err, user) => {
		console.log(!!err, !!user);
		if (err) return done(err);

		if (!user) {
			console.log('User not found');
			return done(null, false, {
				message: 'User not found.'
			});
		}

		bcrypt.compare(password, user.password, (err, result) => {
			console.log('Password mismatch');
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

	console.log('Register', user.username, user.password);
	User.create(user, (err, user) => {
		console.log('User craeted ', !!err, !!user);
		if (err) {
			console.log('errcode: ', err.code);
			console.log(err);
			console.log(err.message);
			let status = err.code === 11000 ? 409 : 500;
			return res.sendStatus(status);
		}

		passport.authenticate('local')(req, res, () => {
			res.send(user.toClient());
		});
	});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
	res.send(req.user.toClient());
});

router.all('/logout', (req, res) => {
	req.logout();
	res.sendStatus(200);
});

export default router;