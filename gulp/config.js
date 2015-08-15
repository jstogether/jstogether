module.exports = {
    /**
     * Configuration for the browserify build step
     */
    browserify: {
        debug: true,
        entries: './client/app.js',
        exclude: [
            './client/bundle.js'
        ],
        outputFilename: 'bundle.js',
        outputPath: './client',
        transform: ['deamdify']
    },
    
    /**
     * Globs indicating what to watch for changes
     */
    watch: {
        clientFiles: [
            './client/**/*'
        ],
        serverFiles: [
            './server.js'
        ]
    }
};