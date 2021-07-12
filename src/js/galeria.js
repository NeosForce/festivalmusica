document.addEventListener('DOMContentLoaded', function(){
    creargaleria();
});

function creargaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){ /* con este for se crean todas las imagenens */
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;
        
        //Anadir la funcion mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);

    //Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //cuando se da click fuera de la imagen
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    //boton para cerrar la imagen
    const cerrarImagen =document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = function(){
        overlay.remove();     
        body.classList.remove('fijar-body');   //quitar lista
    }

    overlay.appendChild(cerrarImagen);

    //mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body'); //quitar lista


}