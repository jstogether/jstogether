let destination = './public';

export default {
	/**
	 *
	 */
	browserify: {
		debug: true,
		outputName: 'bundle.js',
		entries: './app.js',
		extensions: ['.js'],
		transform: ['babelify'],
		watch: [
			'./api/**/*',
			'./component/**/*',
			'./action/**/*',
			'./constant/**/*',
			'./dispatcher/**/*',
			'./store/**/*',
			'./app.js',
			'./util/**/*'
		]
	},

	/**
	 *
	 */
	sass: {
		watch: './sass/**/*.{sass,scss}',
		dest: destination + '/css',
		settings: {
			outputStyle: 'nested'
			// https://github.com/sass/node-sass#options
		}
	},

	/**
	 *
	 */
	server: {
		execute: 'server.js',
		watch: [
			'./public/bundle.js',
			'./db/**/*',
			'./middleware/**/*',
			'./router/**/*',
			'./app.js',
			'./server.js',
			'./auth.js'
		]
	}
}