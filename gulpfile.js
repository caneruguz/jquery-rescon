var gulp = require('gulp');
var concat = require("gulp-concat")
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var source = require('vinyl-source-stream');

var paths = {
    cssfiles : ["./bower_components/bootstrap/dist/css/*.min.css", "./bower_components/jquery-ui/themes/ui-lightness/*.min.css", "./css/*.css"],
    jsfiles : [ "./bower_components/jquery/dist/*.min.js", "./bower_components/jquery-ui/*.min.js", "./bower_components/bootstrap/dist/js/*.min.js", "./scripts/*.js" ],
}



gulp.task('css', function(){
    return gulp.src(paths.cssfiles)
        .pipe(concat('bundle.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function(){
    return gulp.src(paths.jsfiles)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function() {
    gulp.watch(paths.cssfiles, ['css']);
    gulp.watch([paths.jsfiles, './scripts/script.js'], ['js']);
});

gulp.task("default", ["css", "js", "watch"]);