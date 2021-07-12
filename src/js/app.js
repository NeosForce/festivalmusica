document.addEventListener('DOMContentLoaded', function(){
    scrolNav();

    navegacionfija();
})

function navegacionfija(){ //intersepcion observer

    const barra = document.querySelector(".header");


    //Registrar el intersection observer
    const observer = new IntersectionObserver( function(entries){
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        }else{
            barra.classList.add('fijo');
        }
    });


    //elemento a observar
    observer.observe(document.querySelector(".sobre-festival"));

}

function scrolNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //seleciona todos los enlaces de esa clase
    
    enlaces.forEach( function(enlace){
        enlace.addEventListener('click',function(e){  //esto itera sobre cada uno de los elementos
            e.preventDefault(e);

            const seccion = document.querySelector(e.target.attributes.href.value);  //queryselector por que estamos iterando sobre cada uno ed los elementos

            seccion.scrollIntoView({
                behavior: 'smooth',  //efecto suave en click de navegacion
            });
        });
    });
}
