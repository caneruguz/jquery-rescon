var gulp = require('gulp');
var concat = require("gulp-concat")
var minifyCSS = require('gulp-minify-css');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

var paths = {
    cssfiles : ["./bower_components/bootstrap/dist/css/*.min.css", "./bower_components/jquery-ui/themes/ui-lightness/*.min.css", "./css/*.css"],
    jsfiles : [ "./bower_components/jquery/dist/*.min.js", "./bower_components/jquery-ui/*.min.js", "./bower_components/bootstrap/dist/js/*.min.js", "./scripts/*.js" ],
}

gulp.task('css', function(){
    return gulp.src(paths.cssfiles)
        .pipe(concat('bundle.css'))
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./demo/'))
});

gulp.task('js', function(){
    return gulp.src(paths.jsfiles)
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./demo/'))
});

gulp.task('dist_full', function(){
    return gulp.src('./scripts/scripts.js')
            .pipe(rename('jquery-rescon.js'))
            .pipe(gulp.dest('./dist/'))
})
gulp.task('dist_min', ['dist_full'], function(){
    return gulp.src('./scripts/scripts.js')
            .pipe(uglify())
            .pipe(rename('jquery-rescon.min.js'))
            .pipe(gulp.dest('./dist/'))
})

gulp.task('watch', function() {
    gulp.watch(paths.cssfiles, ['css']);
    gulp.watch([paths.jsfiles, './scripts/script.js'], ['js']);
});

gulp.task("default", ["css", "js", "dist_min", "watch"]);