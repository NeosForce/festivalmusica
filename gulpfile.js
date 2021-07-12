const { series , src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//utilidades css
const autoprefixer = require('autoprefixer'); //poder agregar prefijos
const postcss = require('gulp-postcss'); //agregar cierto procesamiento
const cssnano = require('cssnano');// nanoficar css
const sourcemaps = require('gulp-sourcemaps'); //por si necesito ver un css

//utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//Funcion que compila SASS


const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}



function css( ){
    return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe( sass() )
/*     .pipe( sass({
        outputStyle:'expanded' //sirve para que sea mas leible
    }) ) */
    //.pipe( sass() ) //valores normales
    .pipe( postcss([autoprefixer(), cssnano()]  )) //mejoras
    .pipe(sourcemaps.write('.')) //referencia para manejar bien sass
    .pipe( dest('./build/css') )
}

function minificarCSS(){
    return src(paths.scss)
    .pipe( sass({
        outputStyle:'compressed' //sirve para que sea mas ligero
    }) )
    .pipe( dest('./build/css') )
}

function javascript(){
    return src(paths.js)
         .pipe(sourcemaps.init())
         .pipe( concat('bundle.js') )
         .pipe(terser()) //minificar codigo css
         .pipe(sourcemaps.write('.'))
         .pipe( rename({suffix: '.min'}))
         .pipe( dest('./build/js') )
}

function imagenes(){
    return src(paths.imagenes)
    .pipe( imagemin())
    .pipe( dest('./build/img'))
    .pipe( notify({ message: 'Imagen Minificada'})) 
}


function watchArchivos(){
    // watch ('src/scss/app.scss', css ); el * hace que lea todos los archivos con esa extension
    watch (paths.scss, css ); // el **/* le dice que recorra todos los archivos que esten en carpetas y tengan esa extension
    watch (paths.js, javascript);
}


function versionwebp(){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe( notify({ message: 'version webp lista'}))
}


exports.css = css; //para imprimir varias tareas o funciones, se le puede colocar nombre (series lo hace uno tras otra y paralelo todas al mismo tiempo)
exports.minificarCSS = minificarCSS; 
exports.imagenes = imagenes; 
exports.watchArchivos = watchArchivos;

exports.default = series( css, javascript,  imagenes, versionwebp,  watchArchivos)