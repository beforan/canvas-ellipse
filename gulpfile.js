const pkg = require("./package.json");
const paths = pkg.paths;

const gulp = require("gulp");
const browserify = require("browserify");
const sourcemaps = require("gulp-sourcemaps");
const header = require("gulp-header");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const rename = require("gulp-rename");
const del = require("del");
const util = require("gulp-util");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
const mocha = require("gulp-mocha");

const fileHeader = `/* ${pkg.name} ${pkg.version} | ${new Date()} */\n`;

// JS: Test
gulp.task("test", () => gulp
    .src(["test/**/*.ts"])
    .pipe(mocha({
        reporter: "nyan",
        require: [
            "ts-node/register"
        ]
    }))
);

gulp.task("test-vsts", () => gulp
.src(["test/**/*.ts"])
.pipe(mocha({
    reporter: "mocha-junit-reporter",
    require: [
        "ts-node/register"
    ]
}))
);

// JS: build. Browserify + Typescript
gulp.task("ts", () =>
    browserify({
        debug: true,
        standalone: "Ellipse"
    })
        .add(`${paths.src}/app.ts`)
        .plugin(tsify, { project: `${paths.src}` })
        .bundle()
        .on("error", (err) => util.log(util.colors.red("[Error]"), err.toString()))
        .pipe(source("ellipse.js"))
        .pipe(buffer())
        .pipe(sourcemaps.write())
        .pipe(header(fileHeader))
        .pipe(gulp.dest(paths.dest))
);

// JS: uglify. Run the JS task first.
gulp.task("uglify", ["ts"], () => gulp
    .src([`${paths.dest}/*.js`, `!${paths.dest}/*.min.js`])
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(uglify()).on("error", (err) => util.log(util.colors.red("[Error]"), err.toString()))
    .pipe(header(fileHeader))
    .pipe(gulp.dest(paths.dest))
);

// Delete generated content.
gulp.task("clean", () => del.sync([paths.dest]));

// Default and watch
gulp.task("watch", ["default"], () => {
    gulp.watch(`${paths.src}/**/*.ts`, ["ts"]);
});

// Everything except watch
gulp.task("default", ["clean", "uglify"]);