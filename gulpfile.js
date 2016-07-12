const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const eslint = require('gulp-eslint');
const gulpMocha = require('gulp-mocha');


const scripts = ['src/**/*.js'];
const tests = ['test/**/*.js'];
const allScripts = scripts.concat(tests);

gulp.task('lint', function () {
  return gulp.src(allScripts)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], function () {
  return gulp.src(scripts)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('clean-temp', function(cb){
  rimraf('./tmp', cb);
});

gulp.task('pre-test', ['clean-temp'], function(){
  gulp.src(scripts).pipe(babel()).pipe(gulp.dest('tmp/src'));
  return gulp.src(tests).pipe(babel()).pipe(gulp.dest('tmp/test'));
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src('tmp/test/**/*.js')
    .pipe(gulpMocha());
});

gulp.task('dev', ['build'], function() {
  gulp.watch(scripts, ['build']);
});

gulp.task('default', ['build']);
