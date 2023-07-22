const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
//img
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss') //find sass file
        .pipe(plumber())
        .pipe(sass()) //compile
        .pipe(dest("build/css")); //save on harddisk

    done(); //callback tells gulp this is the end
}

function dev(done) {
    watch('src/scss/**/*.scss',css);
    done();
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

exports.css = css;
exports.images = images;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( images, versionWebp, versionAvif, dev );