
//Gulp General Workflow
//Author: Jesus Tellez
//Support: jesus@orangegleam.com

//require node modules that we're using ..............
var gulp = require('gulp');                        //.
var browserSync = require('browser-sync').create();//.
var sass = require('gulp-sass');                   //.
var useref = require('gulp-useref');               //.
var uglify = require ('gulp-uglify');              //.
var gulpIf = require ('gulp-if');                  //.
var cssnano = require ('gulp-cssnano');            //.
var imagemin = require ('gulp-imagemin');          //.
var cache = require ('gulp-cache');                //.
var del = require('del');                          //.
var runSequence = require('run-sequence');         //.
//....................................................


//Setup a Webserver
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

//Convert Sass/SCSS into CSS 
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss') //Gets all files ending with .scss in app/scss
        .pipe(sass()) //Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
        	stream: true
        }))
});

//Concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build" and ends with "<!--endbuild"
gulp.task('useref', function(){
	return gulp.src('app/*.html')
	.pipe(useref())
	//Minifies only if it's a JavaScriptfile
	.pipe(gulpIf('*.js', uglify()))
  //Minifies only if it's a CSS file
  .pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist')) // places the minified and concatenated file in the js dist folder as main.min.js[setup on the index page].
});

//Task to optimize images
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg|)')
  //Caching images that ran through imagemin
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
});

//Coping the fonts into the Dist folder.
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

//Cleaning up or deleting the files in the dist folder.
gulp.task('clean:dist', function(){
  return del.sync('dist');
})

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})



gulp.task('watch', ['browserSync', 'sass'], function (){ // running the browserSync task before the sass task.
  gulp.watch('app/scss/**/*.scss', ['sass']); //watching for files whenever a sass file is changed.
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});