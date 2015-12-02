var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    gulpFlatten = require('gulp-flatten'),
    _ = require("lodash"),
    less = require("gulp-less"),
    includeSources = require("gulp-include-source");

var config = {
    minAppCss: ['./public/css/less/*.less'],
    all: [
        './public/assets/**/*.*',
        './public/components/**/*.js',
        './public/shared/**/*.js',
        './public/css/**/*.css',
        './public/vendor/**/*.*',
        './public/html/index.html'
    ],
    minLibJs: buildFileList([
        {
            prefix: './public/vendor/bower_components/',
            files: [
                'holderjs/holder.js',
                'string-mask/src/string-mask.js',
                'moment/min/moment.min.js',
                'perfect-scrollbar/min/perfect-scrollbar.min.js',
                'angular/angular.min.js',
                'angular-ui-router/release/angular-ui-router.min.js',
                'angular-resource/angular-resource.min.js',
                'angular-cookies/angular-cookies.min.js',
                'angular-sanitize/angular-sanitize.min.js',
                'angular-animate/angular-animate.min.js',
                'angular-messages/angular-messages.min.js',
                'ng-file-upload/angular-file-upload-shim.min.js',
                'ng-file-upload/angular-file-upload.min.js',
                'angular-ui-utils/ui-utils.min.js',
                'angular-modal-service/dst/angular-modal-service.min.js',
                'angular-moment/angular-moment.min.js',
                'angular-input-masks/angular-input-masks-standalone.min.js',
                'angular-google-maps/dist/angular-google-maps.min.js',
                'angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
                'angularjs-socialshare/dist/angular-socialshare.min.js'
            ]
        }
    ]),
}


// run default tasks
gulp.task('default', function() {
    gulp.start('watchCss');
    gulp.start('watchAll');
    // gulp.start('minAppCss');
});


// css
gulp.task('watchCss', function (cb) {
    gulp.start('minAppCss', function(){});
    watch(config.minAppCss, function (a,b,c) {
        gulp.start('minAppCss', cb);
    });
});
gulp.task('minAppCss', function(cb) {
    return gulp.src(config.minAppCss, {base: 'public/css/less'})
        .pipe(sourcemaps.init())
            .pipe(less()).on('error',swallowError)
            // .pipe(minifyCss({compatibility: 'ie8'}))
            .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./public/assets/css'));
});

// html
gulp.task('watchAll', function(cb) {
    gulp.start('injectToHtml', function(){});
    watch(config.all,{events: ['add', 'unlink']}, function (a,b,c) {
        gulp.start('injectToHtml', cb);
    });
});
gulp.task('injectToHtml', function() {
  return gulp.src( './public/html/index.html' )
    .pipe( includeSources({
        cwd: './public'
    }))
    .pipe( gulp.dest('./public') );
});






function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}
function buildFileList(fileList){
    
    return _.flatten(_.map(fileList, function(obj){
        if(!obj)return '';
        if(_.isString(obj))
            return obj;
        var prefix = obj.prefix || '';
        var fList =  _.map(obj.files, function(file){
            return prefix + file;
        });
        return fList;
    }));
    
}