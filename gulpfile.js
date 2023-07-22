const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
//img
const webp = require('gulp-webp');

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

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel( versionWebp, dev );