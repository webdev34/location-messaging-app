// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp     = require('gulp'),
    $        = require('gulp-load-plugins')(),
    rimraf   = require('rimraf'),
    sequence = require('run-sequence'),
    router   = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. FILE PATHS
// - - - - - - - - - - - - - - -

var paths = {
  assets: [
    './client/**/*.*',
    '!./client/app/**/*.js',
    '!./client/app/**/*.html',
    '!./client/assets/{scss,js}/**/*.*'
  ],
  // Sass will check these folders for files when you use @import.
  sass: [
    'client/assets/scss',
    'bower_components/foundation-apps/scss'
  ],
  // These files include Foundation for Apps and its dependencies
  foundationJS: [
    'bower_components/fastclick/lib/fastclick.js',
    'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
    'bower_components/tether/tether.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/foundation-apps/js/vendor/**/*.js',
    'bower_components/foundation-apps/js/angular/**/*.js',
    '!bower_components/foundation-apps/js/angular/app.js'
  ],
  // Plugins
  plugins: [
   'bower_components/ngmap/build/scripts/ng-map.min.js'
  ],

  // These files are for your app's JavaScript
  appJS: [
    'client/app/app.js',
    'client/app/**/*.js'
  ],
  templates: [
    './client/app/**/*.html'
  ],
  build:'./build'
  //build: './../quiver-api-server/api/web/enterprise'

}

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf( (paths.build) , cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest(paths.build))
  ;
});

// Compiles Sass
gulp.task('sass', function () {
  return gulp.src('client/assets/scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sass,
      outputStyle: 'nested',
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest(paths.build +'/assets/css/'))
  ;
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function(cb) {
  // Foundation JavaScript
  gulp.src(paths.foundationJS)
    .pipe($.sourcemaps.init())
    .pipe($.uglify()
      .on('error', function (e) {
        $.util.beep();
        console.log(e);
      }))
    .pipe($.concat('foundation.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js/'))
  ;

  // Plugins JS
  gulp.src(paths.plugins)
    .pipe($.sourcemaps.init())
    .pipe($.uglify()
      .on('error', function (e) {
        $.util.beep();
        console.log(e);
      }))
    .pipe($.concat('plugins.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js/'))
  ;

  // App JavaScript
  gulp.src(paths.appJS)
    .pipe($.sourcemaps.init())
    // .pipe($.uglify()
    //   .on('error', function(e) {
    //     $.util.beep();
    //     console.log(e);
    //   }))
    .pipe($.concat('app.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.build + '/assets/js/'))
  ;

  cb();
});

// Copies your app's page templates and generates URLs for them
gulp.task('copy:templates', function() {
  return gulp.src(paths.templates)
    .pipe(router({
      path: 'build/assets/js/routes.js',
      root: 'client'
    }))
    .pipe(gulp.dest(paths.build + '/app'))
  ;
});

// Compiles the Foundation for Apps directive partials into a single JavaScript file
gulp.task('copy:foundation', function(cb) {
  gulp.src('bower_components/foundation-apps/js/angular/components/**/*.html')
    .pipe($.ngHtml2js({
      prefix: 'components/',
      moduleName: 'foundation',
      declareModule: false
    }))
    .pipe($.uglify())
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(paths.build + '/assets/js'))
  ;

  // Iconic SVG icons
  gulp.src('./bower_components/foundation-apps/iconic/**/*')
    .pipe(gulp.dest(paths.build + '/assets/img/iconic/'))
  ;

  cb();
})

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', function() {
  gulp.src('./build')
    .pipe($.webserver({
      port: 8080,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function(cb) {
  sequence('clean', ['copy', 'copy:foundation', 'sass', 'uglify'], 'copy:templates', function() {
    console.log("Successfully built.");
    cb();
  });
});

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', function () {
  // Run the server after the build
  sequence('build', 'server');

  // Watch Sass
  gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./client/app/**/*', './js/**/*'], ['uglify']);

  // Watch static files
  gulp.watch(['./client/**/*.*', '!./client/app/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);

  // Watch app templates
  gulp.watch(paths.templates, ['copy:templates']);
});
