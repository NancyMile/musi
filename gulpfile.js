const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

//img
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss') //find sass file
        .pipe(plumber())
        .pipe(sass()) //compile
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(dest("build/css")); //save on harddisk

    done(); //callback tells gulp this is the end
}

function versionWebp( done ){
    const options = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(options))
        .pipe(dest("build/img"))

    done();
}

function images(done) {
    const options = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(options)))
        .pipe(dest("build/img"))

    done();
}

function versionAvif( done ){
    const options = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
        .pipe(avif(options))
        .pipe(dest("build/img"))

    done();
}

 function javascript(done){
     src('src/js/**/*.js')
         .pipe(dest('build/js'));
     done();
 }


function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js',javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( images, versionWebp, versionAvif,javascript, dev );