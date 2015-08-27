import authRouter from './route/auth';
import coreRouter from './route/core';
import userRouter from './route/user';
import teamRouter from './route/team';
import projectRouter from './route/project';

import ensureAuthentication from '../middleware/ensureAuthentication';
import errorHandler from './route/errorHandler';


export default (app) => {
	app.use('/', coreRouter);

	app.use('/auth', authRouter);
	app.use('/user', ensureAuthentication, userRouter);
	app.use('/project', ensureAuthentication, projectRouter);
	app.use('/team', ensureAuthentication, teamRouter);

	errorHandler(app);
}