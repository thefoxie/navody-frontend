'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const taskListing = require('gulp-task-listing')
const runsequence = require('run-sequence')
const taskArguments = require('./tasks/gulp/task-arguments')
const nodemon = require('nodemon')
const concat = require('gulp-concat')

// Gulp sub-tasks
require('./tasks/gulp/clean.js')
require('./tasks/gulp/lint.js')
require('./tasks/gulp/compile-assets.js')
require('./tasks/gulp/watch.js')
// new tasks
require('./tasks/gulp/copy-to-destination.js')
require('./tasks/gulp/asset-version.js')
require('./tasks/gulp/sassdoc.js')

const external = {
  scripts: [
    'lib/replace-diacritics.js',
    'lib/slovak-municipalities.js',
    'lib/testData.js',
    'node_modules/accessible-autocomplete/dist/accessible-autocomplete.min.js'
  ],
  styles: [
    'node_modules/accessible-autocomplete/dist/accessible-autocomplete.min.css'
  ]
}

// Umbrella scripts tasks for preview ---
// Runs js lint and compilation
// --------------------------------------
gulp.task('scripts', cb => {
  runsequence('js:compile', cb)
})

// Umbrella styles tasks for preview ----
// Runs js lint and compilation
// --------------------------------------
gulp.task('styles', cb => {
  runsequence('scss:lint', 'scss:compile', cb)
})

// Copy assets task ----------------------
// Copies assets to taskArguments.destination (public)
// --------------------------------------
gulp.task('copy:assets', () => {
  return gulp.src(paths.src + 'assets/**/*')
    .pipe(gulp.dest(taskArguments.destination + '/assets/'))
})

gulp.task('external-scripts', () => {
  return gulp.src(external.scripts)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})

gulp.task('external-styles', () => {
  return gulp.src(external.styles)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})

// All test combined --------------------
// Runs js, scss and accessibility tests
// --------------------------------------
gulp.task('test', cb => {
  runsequence(
    'scss:lint',
    'scss:compile',
    cb
  )
})

// Copy assets task for local & heroku --
// Copies files to
// taskArguments.destination (public)
// --------------------------------------
gulp.task('copy-assets', cb => {
  runsequence(
    'styles',
    'scripts',
    'external-scripts',
    'external-styles',
    cb
  )
})

// Dev task -----------------------------
// Runs a sequence of task on start
// --------------------------------------
gulp.task('dev', cb => {
  runsequence(
    'clean',
    'copy-assets',
    'sassdoc',
    'serve',
    cb
  )
})

// Serve task ---------------------------
// Restarts node app when there is changed
// affecting js, css or njk files
// --------------------------------------

gulp.task('serve', ['watch'], () => {
  return nodemon({
    script: 'app/start.js'
  })
})

// Build package task -----------------
// Prepare package folder for publishing
// -------------------------------------
gulp.task('build:package', cb => {
  runsequence(
    'clean',
    'copy-files',
    'js:compile',
    'external-scripts',
    'external-styles',
    cb
  )
})
gulp.task('build:dist', cb => {
  runsequence(
    'clean',
    'copy-assets',
    'copy:assets',
    'update-assets-version',
    cb
  )
})

// Default task -------------------------
// Lists out available tasks.
// --------------------------------------
gulp.task('default', taskListing)
