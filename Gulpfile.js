var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    prefix = require('gulp-autoprefixer'),
    beautify = require('gulp-jsbeautifier'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    beautify = require('gulp-beautify'),
    prettyHtml = require('gulp-pretty-html'),
    fileinclude = require('gulp-file-include');


gulp.sources = {
    public: './public',
    build: './build',
    layout: './layout',
    dist: './dist',
};

// compile task
gulp.task('js', function () {
    gulp.src(gulp.sources.build + '/js/*.js')
        .pipe(gulpif(uglify(), beautify()))
        .pipe(gulp.dest(gulp.sources.dist + '/public/js'))
        .pipe(browserSync.stream());
});
gulp.task('scss', function () {
    gulp.src(gulp.sources.build + '/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(minifyCss())
        .pipe(rename('style.css'))
        .on('error', swallowError)
        .pipe(gulp.dest(gulp.sources.dist + '/public/css'))
        .pipe(browserSync.stream());
});

// browser sync init
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('fileinclude', () => {
    gulp.src(gulp.sources.build + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettyHtml())
        .pipe(gulp.dest(gulp.sources.dist))
        .pipe(browserSync.stream());
});
gulp.task('tem_fileinclude', () => {
    gulp.src(gulp.sources.layout + '/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(browserSync.stream());
});


// watch for changes in html, css, scss
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(gulp.sources.build + '/scss/*.scss', ['scss']);
    gulp.watch(gulp.sources.build + '/js/*.js', ['js']);
    gulp.watch(gulp.sources.build + '/*.html', ['fileinclude']);
    gulp.watch(gulp.sources.layout + '/*.html', ['tem_fileinclude', 'fileinclude']);
    gulp.watch('*.html')
        .on('change', browserSync.reload);
})

// skip if error occured
function swallowError(error) {
    console.log(error.toString())
    this.emit('end')
}