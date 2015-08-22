# jstogether!

### Local development

You will need these tools for local development:

- [git](https://git-scm.com/)
- [nodejs](https://nodejs.org/)
- [python 2.7](https://www.python.org/)
- [mongodb](https://www.mongodb.org/downloads)
- A c++ compiler, such as [visual studio](https://www.visualstudio.com/)

Be sure to check "Add to system path" when installing Python.

And these for deployment:

- [heroku](https://heroku.com)

Clone the repository:

`git clone git@github.com:jstogether/jstogether.git`

Currently we have 2 branches: `master` and `react`.  To develop with the react branch:

`git checkout react`

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

This pushes the local branch `react` to heroku, pretending it is the `master` branch.  This is done because Heroku will only execute the install scripts (and build/compile the application) when the branch being updated is named `master`.

### Questions?

[jstogether on reddit](https://www.reddit.com/r/jstogether)

[jstogether on slack](https://jstogetherteam.slack.com/)
