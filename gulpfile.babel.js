import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import watch from 'gulp-watch';
import sourcemaps from 'gulp-sourcemaps';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import browserify from 'browserify';
import babel from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import ptu from 'gulp-pug-template-underscore';
import eslint from 'gulp-eslint';

gulp.task('pugTasks', () => {
  gulp.src(['src/pug/**/*.pug','!src/pug/templates/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dest'));
});
gulp.task('sassTasks', () => {
  gulp.src(['src/sass/**/*.scss', '!src/sass/{base,layouts,mixins,modules,state,utilities,vendors,variables}/**/*.scss'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifyCss({ advanced: false }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dest/stylesheets'));
});
gulp.task('es6Tasks', (callback) => {
  browserify({
    entries: 'src/es6/app.js',
    debug: true,
  })
    .transform(babel)
    .bundle()
    .on('error', function error(argument) {
      notify.onError({
        title: "Compile Error",
        message: "<%= error %>",
      }).apply(this, argument);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: '',
      pathSplit: '/',
      extension: true,
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/javascripts'))
    .on('end', () => callback());
});
gulp.task('lint', () => {
  gulp.src(['src/es6/**/*.js', 'src/test/**/*.js', 'gulpfile.babel.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
gulp.task('default', () => {
  gulp.start(['pugTasks', 'sassTasks', 'es6Tasks']);
  watch(['src/pug/**/*.pug'], () => gulp.start(['pugTasks']));
  watch(['src/sass/**/*.scss'], () => gulp.start(['sassTasks']));
  watch(['src/es6/**/*.js', 'src/pug/templates/**/*.pug'], () => gulp.start(['es6Tasks']));
});
