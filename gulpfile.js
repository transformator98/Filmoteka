'use strict';

const { series, parallel, watch } = require('gulp');
const requireDir = require('require-dir');
const browserSync = require('browser-sync').create();

const tasks = requireDir('./gulp/tasks', { recurse: true });
const paths = require('./gulp/paths');

const serve = () => {
  return browserSync.init({
    server: 'build',
    notify: false,
    open: false,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: process.env.PORT || 1234,
  });
};

const watcher = done => {
  watch(paths.watch.html).on(
    'change',
    series(tasks.html, tasks.inject, browserSync.reload),
  );
  watch(paths.watch.css).on('change', series(tasks.css, browserSync.reload));
  watch(paths.watch.js).on('change', series(tasks.scripts, browserSync.reload));
  watch(paths.watch.images, tasks.images);
  watch(paths.watch.fonts, tasks.fonts);

  done();
};

exports.start = series(
  tasks.clean,
  tasks.images,
  parallel(tasks.css, tasks.fonts, tasks.scripts, tasks.html),
  tasks.inject,
  watcher,
  serve,
);

exports.build = series(
  tasks.clean,
  tasks.images,
  parallel(tasks.css, tasks.fonts, tasks.scripts, tasks.html),
  tasks.inject,
);

var gulp = require('gulp'),
  babelify = require('babelify'),
  // notify = require('gulp-notify'),     //On-demand use
  browserify = require('browserify'),
  buffer = require('gulp-buffer'),   //vinyl-buffer is also available
  uglify = require('gulp-uglify'),
  source = require('vinyl-source-stream');   //vinyl-source-buffer on demand

gulp.task('default', function () {
  browserify('./index.js')
    .transform("babelify", { plugins: ["transform-runtime"], presets: [["env"]] })     //babel processing
    .bundle()       //Processing module dependencies
    .pipe(source("index.js"))      //Convert to vinyl file object
    .pipe(buffer())          //Convert to buffer for code compression
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .pipe(notify({
      message: 'javascript compile complete'
    }));
});