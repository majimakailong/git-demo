
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

//css操作
gulp.task('style', function () {

	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())//转换为css
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({stream:true}));

});

//JS操作
gulp.task('script', function () {

	gulp.src('src/scripts/*.js')
		.pipe(concat("all.js"))//合并
		.pipe(uglify())//压缩
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({stream:true}));

});


//图片操作
gulp.task('image', function () {

	gulp.src('src/image/*.*')
		.pipe(gulp.dest('dist/image'))
		.pipe(browserSync.reload({stream:true}));

});


//html操作
gulp.task('html', function () {

	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload(
			{stream:true}
		));

});

//同步操作
gulp.task('serve', function () {

	browserSync({
		server:{
			baseDir:['dist']
		}
	}, function (err,bs) {
		console.log(bs.options.getIn(['urls','local']));
	});

	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/image/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});