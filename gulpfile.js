let gulp = require('gulp');
let del = require('del'), //删除文件夹
    browserSync = require('browser-sync'), //浏览器自动刷新
    base64 = require('gulp-base64'), //小图片转 base64
    less = require('gulp-less'), // less --> css
    autoprefixer = require('gulp-autoprefixer'), // css 添加浏览器私有前缀
    cssmin = require('gulp-clean-css'), // css 压缩

    babel = require('gulp-babel'), // ES6 --> ES5
    jshint = require('gulp-jshint'), // js 校验，依赖 jshint
    uglify = require('gulp-uglify'), // js 压缩

    sourcemaps = require('gulp-sourcemaps'), //生成 SourceMaps
    rename = require('gulp-rename'), //改名
    plumber = require('gulp-plumber'), //处理管道崩溃问题
    runSequence = require('run-sequence'); //顺序执行


/* 静态服务器 */
gulp.task('browser-sync', function () {
    browserSync.init({
        /*详细配置：https://browsersync.io/docs/options*/
        port: 3333,
        ui: {
            port: 3334,
            weinre: {
                port: 3335
            }
        },
        server: {
            baseDir: 'src',
            /*静态服务器打开的首页面*/
            index: 'index.html'
        },
        /*禁止更新页面时浏览器窗口右上角的提示*/
        notify: false
    });
});

/* LESS --> CSS */
gulp.task('less', function () {
    let optionsBase64 = {
        /*详细配置：https://www.npmjs.com/package/gulp-base64*/
        extensions: ['png'],
        maxImageSize: 5 * 1024, //小于5kb
        debug: false
    };
    let optionsPrefixer = {
        /*详细配置：https://github.com/postcss/autoprefixer#options*/
        browsers: ['Android >= 4.0', 'iOS >= 7']
    };

    return gulp.src(['src/less/*.less', '!src/less/base.less'])
    /*如果less文件中有语法错误，用plumber保证任务不会停止*/
        .pipe(plumber())
        .pipe(less())
        .pipe(base64(optionsBase64))
        .pipe(autoprefixer(optionsPrefixer))
        .pipe(gulp.dest('src/css'));
});

/* 监听less文件夹下的*.less文件变化，然后执行less命令 */
gulp.task('watch:less', ['less'], function () {
    gulp.watch('src/less/*.less', ['less']);
});

/*监听开发目录下的所有*.less *.scss *.css *.js *.html文件变化，然后自动刷新浏览器*/
gulp.task('watch:browser', ['less', 'browser-sync'], function () {
    /*调用上面定义的less*/
    gulp.watch('src/less/*.less', ['less']);

    /*通过 browserSync 控制浏览器自动刷新*/
    let reload = browserSync.reload;
    gulp.watch('src/**/*.css').on('change', reload);
    gulp.watch('src/**/*.js').on('change', reload);
    gulp.watch('src/**/*.html').on('change', reload);
});

/*----- 分割线（上：部署开发环境；下：部署生产环境） -----*/

/* 压缩 css */
gulp.task('css', function () {
    let optionsCssmin = {
        /*详细配置：https://github.com/jakubpawlowicz/clean-css*/
        compatibility: '*', //类型：String 默认：'*' [启用兼容模式； 'ie7'：IE7+兼容模式，'ie8'：IE8+兼容模式，'ie9'：IE9+兼容模式，'*'：IE10+兼容模式]
        specialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    };

    return gulp.src(['src/css/popup.css'])
        .pipe(cssmin(optionsCssmin))
        .pipe(rename('popup.min.css'))
        .pipe(gulp.dest('dist'));
});

/* 压缩js */
gulp.task('js', function () {
    return gulp.src('src/js/popup.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(jshint())
        .pipe(uglify())
        .pipe(rename('popup.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

/* 清空dist文件夹 */
gulp.task('clean', function () {
    del('dist');
});

/* 发布任务 */
gulp.task('build', function () {
    runSequence(
        'clean',
        'less',
        ['css', 'js'])
});
