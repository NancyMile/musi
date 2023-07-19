const { src, dest} = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
    src('src/scss/app.scss') //find sass file
        .pipe(sass()) //compile
        .pipe(dest("build/css")); //save on harddisk

    done(); //callback tells gulp this is the end
}

exports.css = css;