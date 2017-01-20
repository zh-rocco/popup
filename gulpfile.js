var gulp = require('gulp');
var del = require('del'),  // 删除文件夹
    browserSync = require('browser-sync'),  // 浏览器自动刷新
    base64 = require('gulp-base64'),  // 小图片转 base64
    less = require('gulp-less'),    // less 转换 css
    autoprefixer = require('gulp-autoprefixer'),    // css 添加浏览器私有前缀
    cssmin = require('gulp-clean-css'), // css 压缩
    jshint = require('gulp-jshint'),    // js 校验，依赖 jshint
    uglify = require('gulp-uglify'),    // js 压缩
    runSequence = require('run-sequence'),  // 顺序执行
    rename = require('gulp-rename'),  // 改名
    plumber = require('gulp-plumber'),  // 处理管道崩溃问题
    notify = require('gulp-notify');  // 报错与不中断当前任务


// 静态服务器
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'src',
            //静态服务器打开的首页面
            index: 'index.html'
        }
    });
});

// less转css
gulp.task('less', function () {
    var optionsPrefixer = {
        browsers: ['Android >= 4.0', 'iOS >= 7'],
        cascade: true,  //是否美化属性值 默认：true
        remove: true    //是否去掉不必要的前缀 默认：true
    };
    var optionsBase64 = {
        extensions: ['png'],
        maxImageSize: 20 * 1024, //小于20kb
        debug: false
    };


    return gulp.src(['src/**/less/*.less', '!src/less/base.less'])
    //如果less文件中有语法错误，用plumber保证任务不会停止
        .pipe(plumber())
        .pipe(less())
        .pipe(base64(optionsBase64))
        .pipe(autoprefixer(optionsPrefixer))
        //路径改名，**/less 改成 **/css，输出文件保存至less同级目录下的css文件夹
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('less', 'css')
        }))
        .pipe(gulp.dest('src'));
});

// 监听less文件夹下的*.less文件变化，然后执行less命令
gulp.task('watch:less', ['less'], function () {
    gulp.watch('src/**/*.less', ['less']);
});

// 监听src目录下的所有*.less *.css *.js *.html文件变化，然后自动刷新浏览器
gulp.task('watch:browser', ['less', 'browser-sync'], function () {
    gulp.watch('src/**/*.less', ['less']);

    // 通过 browserSync 控制浏览器自动刷新
    var reload = browserSync.reload;
    gulp.watch('src/**/*.css').on('change', reload);
    gulp.watch('src/**/*.js').on('change', reload);
    gulp.watch('src/**/*.html').on('change', reload);
});


/*----- 分割线（上：部署开发环境；下：部署生产环境） -----*/

// 压缩css
gulp.task('css', function () {
    var optionsCssmin = {
        advanced: true,    //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: '*',   //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: false,   //类型：Boolean 默认：false [是否保留换行]
        keepSpecialComments: '*'    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    };

    return gulp.src(['src/css/popup.css'])
        .pipe(cssmin(optionsCssmin))
        .pipe(rename('popup.min.css'))
        .pipe(gulp.dest('dist'));
});

// 压缩js、添加版本号
gulp.task('js', function () {
    return gulp.src('src/js/popup.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(rename('popup.min.js'))
        .pipe(gulp.dest('dist'));
});

// 清理所有缓存、清空dist文件夹
gulp.task('clean', function () {
    del('dist');
});

// 发布任务
gulp.task('build', function () {
    runSequence(
        'clean',
        'less',
        ['css', 'js'])
});
