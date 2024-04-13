$(document).ready(function () {

    activateMenu();
    mostrarMenuSistema();

//    //Activa tooltip para todos los elementos con el atributo tooltip
//    $('[data-toggle="tooltip"]').tooltip({
//        animation: 'false'
//    });

    // Muestra el cuadro de carga
    //$('a[href^="/"]').click(function () {
    //    var attr = $(this).attr('href');
    //    if (typeof attr !== typeof undefined && attr !== false) {
    //        showLoading();
    //    }
    //});

    //$('input[type="submit"]').click(function () {
    //        showLoading();
    //});
    
});

////Agrega la clase active al menu seleccionado
function activateMenu() {
    var urls = window.location.pathname.split('/');
    $("a[href='/" + urls[1] + "']").addClass('active');
}


function showLoading() {
    $('#loading-screen').fadeIn(200);
}

function hideLoading() {
    $('#loading-screen').fadeOut(200);
}

function mostrarMenuSistema() {
    var urls = window.location.pathname.split('/');
    $("nav.menuLateral ul.menuLateral").addClass('noMostrar');
    var urlsMinuscula = urls[1].toLowerCase();
    if (urlsMinuscula.includes("administracion")) {
        $("#administracion").removeClass("noMostrar");
    } else {
        $("#exequatur").removeClass("noMostrar");
    }
}


