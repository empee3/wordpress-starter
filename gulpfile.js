//Load Plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var js = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(browsersync.stream());
});

gulp.task('js', function () {
  return gulp.src('./assets/js/*.js')
    .pipe(js())
    .pipe(gulp.dest('./assets/js/min'))
    .pipe(sourcemaps.init())
    .pipe(browsersync.stream());
});

gulp.task('imagemin', function () {
    gulp.src('./assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./assets/images'))
});

gulp.task('browser-sync', function() {
  browsersync.init({
  	proxy: 'localhost/SITE-DIRECTORY'
  });
});

gulp.task('reload', function () {
  browsersync.reload();
});

gulp.task('watch', function() {
  gulp.watch('./assets/sass/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch('./assets/images/*' , ['imagemin']);
  gulp.watch(['*.html', '*.php'], ['reload']);
});

// This adds the task to the default gulp task, which means it will run with just the ‘gulp’ command
gulp.task('default', ['sass', 'js', 'imagemin', 'browser-sync', 'watch']);