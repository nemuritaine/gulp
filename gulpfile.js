const path = require('path'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'), // @importを纏めて指定
    gcmq = require('gulp-group-css-media-queries'),
    compass = require('gulp-compass'),
    cleanCSS = require('gulp-clean-css'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    server = browserSync.create(),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    pug = require("gulp-pug"),
    webpack = require("webpack"),
    webpackStream = require("webpack-stream"),
    webpackConfig = require("./webpack.config.js");

const Name = 'noveltyinc.co.jp',
    develop = {
        'root': './wordpress/wp-content/themes/' + Name + '/src/'
    },
    release = {
        'root': './wordpress/wp-content/themes/' + Name + '/',
        'style': './wordpress/wp-content/themes/' + Name + '/css/',
        'script': './wordpress/wp-content/themes/' + Name + '/js/',
        'images': './wordpress/wp-content/themes/' + Name + '/images/'
    };

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('watch', () => {
    gulp.watch(develop.root + 'style.css', gulp.series('style', 'reload'));
    gulp.watch(develop.root + 'assets/styles/*.scss', gulp.series('styles', 'reload'));
    gulp.watch(develop.root + 'assets/styles/**/*.scss', gulp.series('styles', 'reload'));
    gulp.watch(develop.root + 'include/*.pug', gulp.series('pug', 'reload'));
    gulp.watch(release.root + '*.php', gulp.series('reload'));
    gulp.watch(develop.root + 'assets/scripts/*.js', gulp.series('bundle', 'reload')); //webpackで構築する場合
    gulp.watch(develop.root + 'assets/scripts/**/*.js', gulp.series('bundle', 'reload')); //webpackで構築する場合
    gulp.watch(develop.root + 'assets/scripts/**/*.jsx', gulp.series('bundle', 'reload')); //webpackで構築する場合
    // gulp.watch(develop.root + 'assets/scripts/*.js', gulp.series('scripts', 'reload')); //通常のjsコンパイルで構築する場合
});

gulp.task('connect-sync', (done) => {
    connect.server({
        base: release.root, // Dockerの設定
        port: 3000,
        keepalive: true,
        // port: 3000, // XAMPPの設定
        // bin: 'H:/XAMPP/php/php.exe',
        // ini: 'H:/XAMPP/php/php.ini',
    },
    function() {
        browserSync({
            proxy: 'localhost:8080/wordpress/', // Dockerの設定
            // proxy: 'localhost:3000/wordpress/', // XAMPPの設定
        });
    });
    done();
});

gulp.task('images', function() {
    return gulp.src([
        develop.root + 'assets/images/*.+(jpg|jpeg|png|gif)',
        develop.root + 'assets/images/**/*.+(jpg|jpeg|png|gif)'
    ])
    .pipe(changed(release.root))
    .pipe(
        imagemin([
            pngquant({
                quality: [.7, .85],
                speed: 1,
                floyd: 0
            }),
            mozjpeg({
                quality: 85,
                progressive: true
            })
        ])
    )
    .pipe(gulp.dest(release.images))
    .pipe(notify('&#x1f363; images task finished &#x1f363;'))
});

gulp.task('pug', function(cb) {
    let options = {
        pretty: true
    };
    return gulp.src(develop.root + 'include/*.pug')
    .pipe(plumber())
    .pipe(pug(options))
    .pipe(rename({
        extname: '.php'
    }))
    .pipe(gulp.dest(release.root));
});

gulp.task('scripts', function() {
    return gulp.src([
        develop.root + 'assets/scripts/*.js',
        develop.root + 'assets/scripts/*.jsx'
    ])
    .pipe(babel({
        presets: ['@babel/react', '@babel/preset-env'],
        plugins: ['transform-react-jsx']
    }))
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(uglify()) // 圧縮する
    .pipe(gulp.dest(release.script));
});

gulp.task('bundle', function() {
    var scripts = develop.root + 'assets/scripts/*.js';
    return gulp.src(scripts)
    .pipe(plumber())
    .pipe(webpackStream({
        //watch: true, //webpackのwatchではなくgulpのwatchを使う
        output: {
            filename: '[name].bundle.js',
        },
        mode: "production", //production or development
        entry: {
            app: develop.root + 'assets/scripts/app.js',
            index: develop.root + 'assets/scripts/index.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules\/(?!(dom7|ssr-window)\/).*/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/react'],
                                    ['@babel/env']
                                ],
                            }
                        }
                    ]
                }, {
                    test: /\.$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
            ],
        },
    }, null, function(err, stats) {
        /* Use stats to do more things if needed */
        if (stats.compilation.errors.length) {
            notify.onError({
                title: 'Webpack error',
                message: stats.compilation.errors[0].error,
                sound: 'Frog',
            });
        }
    }))
    .pipe(gulp.dest(release.script));
})

gulp.task('compress', function() {
    return gulp.src(release.script + '*.js')
    .pipe(uglify())
    .pipe(gulp.dest(release.script));
});

gulp.task('style', () => {
    return gulp.src(develop.root + 'style.css')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err.messageFormatted);
            this.emit('end');
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(compass({
        config_file: 'config.rb',
        sass: 'sass',
        css: 'css'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest(release.root));
});

gulp.task('styles', () => {
    return gulp.src([
        develop.root + 'assets/styles/*.scss',
        develop.root + 'assets/styles/**/*.scss'
    ])
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err.messageFormatted);
            this.emit('end');
        }
    }))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    })
    .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq()) //media queryをまとめる
    .pipe(cleanCSS({ rebase: false })) //CSSのminify処理
    //.pipe(rename( {//minifyしたファイルの名前変更
    //    extname: '.min.css'
    //}))
    .pipe(gulp.dest(release.style));
});

gulp.task('phps', () => {
    return gulp.src(develop.loot + '*/.php')
    .pipe(gulp.dest(release.root));
})

gulp.task('dev', gulp.series('connect-sync', 'watch'));