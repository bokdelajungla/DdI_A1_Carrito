var articulo;
var err_articulo;
var precio;
var err_precio;
var uds;
var err_uds;
var tot_articulos;
var tot_precio;
var btn_carrito;
var seleccion;
var box_tarjeta;
var box_efectivo;
var titular_tarjeta;
var num_tarjeta;
var cvv;
var efectivo;
var check;
var btn_reset;
var btn_print;
var productos;
var coste;
var i;

window.addEventListener("load", init);

function init_variables(){
    articulo = document.formulario.articulo;
    err_articulo = document.getElementById("error_articulo");
    precio = document.formulario.precio;
    err_precio = document.getElementById("error_precio");
    uds = document.formulario.cantidad;
    uds.value = "1";
    err_uds = document.getElementById("error_cantidad");

    tot_articulos = document.formulario.total_articulos;
    tot_precio = document.formulario.total_precio;
    tot_precio.value = "0€";

    titular_tarjeta = document.formulario.titular_tarjeta;
    num_tarjeta = document.formulario.numero_tarjeta;
    cvv = document.formulario.cvv;
    efectivo = document.formulario.efectivo;

    btn_carrito = document.formulario.boton_carrito;
    btn_reset = document.formulario.boton_reset;
    btn_print = document.formulario.boton_print;
    btn_print.style = "border: 2px solid #888; color: #888; cursor: none;";
    btn_print.disabled = true;

    seleccion = document.formulario.seleccion;
    box_tarjeta = document.getElementById("box_tarjeta");
    box_efectivo = document.getElementById("box_efectivo");

    check = document.formulario.acepto;

    productos = "";
    coste = 0;
    i = 0;

    articulo.focus();
}

function ev_mouseover(){
    this.style="background-color: #DE3F00; color: #FFFFFF; box-shadow: 1px 1px 6px #FF8181;";
}

function ev_mouseout(){
    this.style="background-color: #FFFFFF; color: #DE3F00; box-shadow: none;";
}

function ev_disabled(){
    "border: 2px solid #888; color: #888; cursor: none";
}
function ev_disabled(){
    "border: 2px solid #888; color: #888; cursor: none";
}

function init_eventos(){
    btn_carrito.addEventListener("click", carrito);
    btn_carrito.onmouseover = ev_mouseover;
    btn_carrito.onmouseout = ev_mouseout;
    btn_reset.addEventListener("click", reset);
    btn_reset.onmouseover = ev_mouseover;
    btn_reset.onmouseout = ev_mouseout;
    check.addEventListener("change", aceptar);
    seleccion.addEventListener("change", pago);
    btn_print.addEventListener("click", print)
    btn_reset.onmouseover = ev_disabled;
    btn_reset.onmouseout = ev_disabled;
}

function esTxt(txt) {
    var txt_regExp = /^[A-Za-z]+$/;
    return txt_regExp.test(txt);
}

function carrito(){
    if(articulo.value == "" || precio.value === "" || esTxt(precio.value) || uds.value <= 0) {

        if(uds.value <= 0) {
            err_uds.textContent = "faltan unidades";
            uds.focus();
        } else
            err_uds.textContent = "";
        if(precio.value == "") {
            err_precio.textContent = "falta precio";
            precio.focus();
        } else if(esTxt(precio.value)) {
            err_precio.textContent = "precio no válido";
            precio.focus();
        } else
            err_precio.textContent = "";

        if(articulo.value == "") {
            err_articulo.textContent = "falta artículo";
            articulo.focus();
        } else
            err_articulo.textContent = "";
        
    } else {
        if(++i >= 2)
            productos += ", " + articulo.value;
        else
            productos += articulo.value;
        coste += precio.value * uds.value;

        uds.value = "1";

        err_articulo.textContent = "";
        err_precio.textContent = "";
        err_uds.textContent = "";
        tot_articulos.value = productos;
        tot_precio.value = coste.toString() + "€";
        efectivo.value = coste.toString() + "€";
    }
}

function reset(){
    articulo.value = null;
    precio.value = null;
    uds.value = "1";
    err_articulo.textContent = "";
    err_precio.textContent = "";
    err_uds.textContent = "";
    tot_articulos.value = null;
    tot_precio.value = "0€";
    productos = "";
    coste = 0;
    seleccion.value = "default";
    check.checked = false;
    titular_tarjeta.value = "";
    num_tarjeta.value = "";
    cvv.value = "";
    efectivo.value = "0€";
    box_tarjeta.style.display = "none";
    box_efectivo.style.display = "none";
    btn_print.disabled = true;
    btn_print.style = "border: 2px solid #888; color: #888; cursor: none;";
    btn_print.onmouseover = ev_disabled;
    btn_print.onmouseout = ev_disabled;
    i = 0;
}

function pago(){
    if(seleccion.value == "tarjeta"){
        box_tarjeta.style.display = "block";
        box_efectivo.style.display = "none";
    } else if(seleccion.value == "efectivo"){
        box_tarjeta.style.display = "none";
        box_efectivo.style.display = "block";
    } else {
        box_tarjeta.style.display = "none";
        box_efectivo.style.display = "none";
    }
}

function aceptar(){
    if(this.checked){
        btn_print.style = "border: 2px solid #DE3F00; color: #DE3F00; cursor: pointer;";
        btn_print.disabled = false;
        btn_print.onmouseout = ev_mouseout;
        btn_print.onmouseover = ev_mouseover;
    } else {
        btn_print.style = "border: 2px solid #888; color: #888; cursor: none;";
        btn_print.disabled = true;
        btn_print.onmouseover = ev_disabled;
        btn_print.onmouseout = ev_disabled;
    }
}

function print(){
    if(seleccion.value == "tarjeta" || seleccion.value == "efectivo")
        alert("Los artículos en carrito son: " + productos +"\ny el precio total: " + coste + "\nForma de pago: " + seleccion.value);
    else 
        alert("Seleccione una forma de pago");
}

function init(){
    init_variables();
    init_eventos();
}
