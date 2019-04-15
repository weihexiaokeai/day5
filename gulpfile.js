const gulp =require("gulp")
const concat=require("gulp-concat")
const babel=require("gulp-babel")
const webserver=require("gulp-webserver")
const sass=require("gulp-sass")
const watch=require("gulp-watch")
const cssclen=require("gulp-clean-css")
gulp.task('server',()=>{
    return  gulp.src(".")
    .pipe(webserver({
        open:true,
        livereload:true,
        host:"localhost",
        port:8000,
        fallback:"index.html"
    }))

})
gulp.task("js",()=>{
    return  gulp.src("./js/*.js")
    .pipe(concat("main.js"))
    .pipe(babel({
        presets:"es2015"
    }))

    .pipe(gulp.dest("dist/js"))
})
gulp.task("sass",function(){
  return  gulp.src("./sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/sass"))
})
gulp.task("cssMin",function(){
    return  gulp.src("./sass/*.css")
      .pipe(cssclen())
      .pipe(gulp.dest("dist/css"))
  })
gulp.task("watch",function(){
    gulp.watch("./sass/*.scss",gulp.series("sass"))
})

  gulp.task("dev",gulp.series("sass","server","watch"))
  gulp.task("build",gulp.parallel("js","cssMin"))