# jstogether!

### Local development

You will need these tools for local development:

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/)
- [python 2.7](https://www.python.org/)
- [mongodb](https://www.mongodb.org/downloads)
- A c++ compiler, such as [visual studio](https://www.visualstudio.com/)

And these for deployment:

- [heroku](https://heroku.com)

# Setup Environment

Be sure to check "Add to system path" when installing Python.

In order for github authentication to work, you'll need to create 2
environment variables:

- GITHUB_CLIENT_ID: xxx
- GITHUB_CLIENT_SECRET: xxx

Admins have these values.

Clone the repository:

`git clone git@github.com:jstogether/jstogether.git`

Install the NPM dependencies.  This will also execute an NPM postinstall script (found in [`package.json`](https://github.com/jstogether/jstogether/blob/react/package.json)), which will compile/build the project source and bundle into `/public/bundle.js` and `/public/css/main.css` using gulp tasks `browserify` and `sass`.

`npm install`

Start the gulp taskrunner and go nuts!  This will start the `watch` task, so that whenever you save a source file it will automatically re-compile/bundle all relevant parts of the project, and restart the nodejs server (if required).

`gulp`

You can also run tasks individually like so:

- `gulp sass` // compile SASS -> `/public/css/main.css`
- `gulp browserify` // compile JS -> `/public/bundle.js`
- `gulp server` // Run the node server

### Deployment to production

Add the jstogether Heroku server as a git remote server (you will need permission to push to this server):

`git remote add heroku git@heroku.com:jstogether.git`

To push your local react branch to the Heroku server:

`git push heroku master`

### Questions?

[jstogether on reddit](https://www.reddit.com/r/jstogether)

[jstogether on slack](https://jstogetherteam.slack.com/)
