import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import expressSession from 'express-session';


export default (app) => {
	app.use(cookieParser());
	app.use(bodyParser.json());

	app.use(expressSession({
		secret: 'tomato',
		resave: true,
		saveUninitialized: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());
}