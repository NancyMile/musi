const { src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

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

exports.css = css;
exports.dev = dev;