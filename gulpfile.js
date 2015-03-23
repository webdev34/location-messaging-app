//gulp and plugins
var gulp			= require('gulp'),
	del 			= require('del'),
	beep			= require('beepbeep'),
	concat			= require('gulp-concat'),
	stylish			= require('jshint-stylish'),
	jshint 			= require('gulp-jshint'),
	sass			= require('gulp-ruby-sass'),
	sourcemaps		= require('gulp-sourcemaps'),
	jshint			= require('gulp-jshint'),
	plumber			= require('gulp-plumber'),
	gutil			= require('gulp-util'),
	connect			= require('gulp-connect'),
	livereload		= require('gulp-livereload'),
	sequence		= require('run-sequence');


//error handling
var onError = function (err) {
	beep();
	gutil.log(gutil.colors.red(err));
};

//path variables
var DEST_PATH = 'dest/',
	DEV_PATH  = 'dev/';


gulp.task('clean', function(cb) {
	return del( DEST_PATH + '*', cb );
});

gulp.task('html', function() {
	return gulp.src( DEV_PATH + '**.html' )
		.pipe(gulp.dest( DEST_PATH ));
});

gulp.task('sass', function() {
    return sass( DEV_PATH + 'scss', { sourcemap: true }) 
    	.on('error', function (err) {onError(err);})
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest( DEST_PATH + 'css'));
});

gulp.task('scripts', function() {
	return gulp.src( DEV_PATH + 'js/**' )
		.pipe(plumber({errorHandler: onError }))
		// .pipe(jshint())
  // 		.pipe(jshint.reporter(stylish))
  // 		.pipe(jshint.reporter('fail'))
		.pipe(gulp.dest( DEST_PATH + 'js'));
});

gulp.task('images', function() {
	return gulp.src( DEV_PATH + 'img/**' )
		.pipe(plumber({errorHandler: onError }))
		.pipe(gulp.dest( DEST_PATH + 'img'));
});

gulp.task('connect', function() {
	return connect.server({
		root: DEST_PATH,
		port: 9001,
		livereload: true
	});
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(DEV_PATH + '**.html', ['html']);
	gulp.watch( DEV_PATH + 'scss/**', ['sass']);
	gulp.watch( DEV_PATH + 'img/**', ['images']);
	gulp.watch( DEV_PATH + 'js/**', ['scripts']);
	gulp.watch (DEST_PATH + '**').on('change', livereload.changed)
});

gulp.task('dev', ['clean'], function(callback) {
	sequence(
		'clean',
		['html','sass','scripts','images'],
		'connect',
		'watch',
		callback
		);	
});

gulp.task('default', ['dev']);