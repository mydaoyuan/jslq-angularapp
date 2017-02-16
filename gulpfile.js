var gulp = require('gulp');
var $ =  require('gulp-load-plugins')();
var open = require('open');

var app = {
  srcPath: 'src/',
  devPath: 'build/',
  proPath: 'dist/'
};

gulp.task('lib', function() {
  gulp.src('bower_components/**/*')
    .pipe(gulp.dest(app.devPath + 'vendor'))
    .pipe(gulp.dest(app.proPath + 'vendor'))
    .pipe($.connect.reload())
});

gulp.task('html', function() {
  gulp.src(app.srcPath + '**/*.html')
    .pipe(gulp.dest(app.devPath))
    .pipe(gulp.dest(app.proPath))
    .pipe($.connect.reload())
});

gulp.task('json', function() {
  gulp.src(app.srcPath + 'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.proPath + 'data'))
    .pipe($.connect.reload())
});

gulp.task('less', function() {
  gulp.src(app.srcPath + 'less/app.less')
    .pipe($.less())
    .pipe(gulp.dest(app.devPath + 'style'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.proPath + 'style'))
    .pipe($.connect.reload())
});

gulp.task('js', function() {
  gulp.src(app.srcPath + 'script/**/*.js')
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(app.devPath + 'script'))
    .pipe($.uglify())
    .pipe(gulp.dest(app.proPath + 'script'))
    .pipe($.connect.reload())
});

gulp.task('image', function() {
  gulp.src(app.srcPath + 'image/**/*')
    .pipe(gulp.dest(app.devPath + 'image'))
    .pipe($.imagemin())
    .pipe(gulp.dest(app.proPath + 'image'))
    .pipe($.connect.reload())
});

gulp.task('build', ['lib', 'html', 'json', 'less', 'js', 'image']);

gulp.task('clean', function() {
  gulp.src([app.devPath, app.proPath])
    .pipe($.clean())
});

gulp.task('serve', function() {
  $.connect.server({
    root: [app.devPath],
    livereload: true,
    port: 3007
  })

  open('http://localhost:3007');

  gulp.watch('bower_components/**/*', ['lib']);
  gulp.watch(app.srcPath + '**/*.html', ['html']);
  gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
  gulp.watch(app.srcPath + 'less/**/*.less', ['less']);
  gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
  gulp.watch(app.srcPath + 'image/**/*.image', ['image']);
});

gulp.task('default', ['serve']);
