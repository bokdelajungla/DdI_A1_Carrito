var articulo;
var precio;
var unidades;

var lista;
var total;
var fPago;

var titular;
var numTarjeta;
var cvv;
var importe;

var aceptar;
var botonImprimir;

window.onload=function(){
    inicializar();
    setManejadorEventos();
}

function inicializar(){
    //Variables
    articulo=document.formulario.articulo;
    precio=document.formulario.precio;
    unidades=document.formulario.unidades;

    lista=document.formulario.lista;
    total=document.formulario.total;
    total.value = 0;
    fPago=document.formulario.fPago;

    titular=document.formulario.titular;
    numTarjeta=document.formulario.numTarjeta;
    cvv=document.formulario.cvv;
    importe=document.formulario.importe;

    aceptar=document.formulario.aceptar;
    botonImprimir=document.formulario.botonImprimir;
    
    //Visibilidad
    articulo.focus();
    faltaArticulo.style.display="none";
    faltaPrecio.style.display="none";
    precioIncorrecto.style.display="none";
    capaTarjeta.style.display="none";
    capaEfectivo.style.display="none";
    
}

function setManejadorEventos(){
    document.formulario.botonAddArticulo.addEventListener("click", addArticulo);
    fPago.addEventListener("change", cargarPago);
    aceptar.addEventListener("change", haAceptado);
    document.formulario.botonImprimir.addEventListener("click", imprimir);
    document.formulario.botonRestablecer.addEventListener("click", restablecer)
}

function addArticulo(){
    //Visibilidad
    faltaPrecio.style.display="none";
    faltaArticulo.style.display="none";
    precioIncorrecto.style.display="none";

    //Variables
    var aux; //Variable auxiliar para calcular el subtotal
    aux = parseFloat(total.value); //Cargamos el valor del total actual
    var correcto = validarPrecio(precio.value) //Comprobamos el precio
    
    //Si todos los campos tienen valores correctos
    if(articulo.value !== "" && precio.value !== "" && correcto){
        //Calculamos el subtotal
        aux += parseFloat(precio.value) * parseInt(unidades.value);
        total.value = aux.toString(); //Actualizamos el total
        //Si la lista está vacía
        if(lista.value === ""){
            lista.value = articulo.value;
        }
        //Si ya hay elementos en la lista
        else{
            lista.value += (", " + articulo.value);
        }
        //Reseteo
        articulo.value = "";
        precio.value = "";
        unidades.value = "1";
        articulo.focus();
    }
    //Si el artículo está vacío
    else if(articulo.value===""){
        faltaArticulo.style.display="inline";
        articulo.focus();
    }
    //Si falta el precio
    else if(precio.value===""){
        precio.focus();
        faltaPrecio.style.display="inline";
    }
    //En caso de el precio sea incorrecto
    else{
        precioIncorrecto.style.display="inline";
        precio.focus();
    }
}

/*
Compueba el precio. Si parseFloat devuelve un numero entonces devuelve "true"
Si no devuelve "false"
*/  
function validarPrecio(valor){
    if(isNaN(parseFloat(precio.value))){
        return false;
    }
    else{
        return true;
    }
}

/*
Modifica la visibilidad de los elementos dependiendo de la selección
*/
function cargarPago(){
    if(fPago.value==="seleccione"){
        capaTarjeta.style.display="none";
        capaEfectivo.style.display="none";
    }else if(fPago.value==="tarjeta"){
        capaTarjeta.style.display="block";
        capaEfectivo.style.display="none";
    }else{
        capaTarjeta.style.display="none";
        capaEfectivo.style.display="block";
        importe.value = total.value;
    }
   
}

/*
Habilita o no el botón Imprimir
*/
function haAceptado(){
    if(aceptar.checked){
        botonImprimir.disabled = false;
    }
    else{
        botonImprimir.disabled = true;
    }

}

/*
Lleva a cabo la acción cuando se clicka en el botón Imprimir
*/
function imprimir(){
    if(fPago.value!=="seleccione"){
        alert("Los artículos de mi carrito son: "+lista.value+
            "\ny el preciototal es: "+total.value+" €"+
            "\nForma de pago: "+fPago.value);
    }
    else{
        alert("Seleccione uns forma de pago");
    }
}

/*
Resetea los campos del formulario y hace focus al articulo
*/
function restablecer(){

    articulo.focus();
    //No podemos emplear la función porque se ejecuta antes de que el formulario se resetee
    //cargarPago(),1000);
    capaTarjeta.style.display="none";
    capaEfectivo.style.display="none";
    faltaPrecio.style.display="none";
    faltaArticulo.style.display="none";
    precioIncorrecto.style.display="none";
    //total.value = "0"; //No hace falta porque ya se resetea por el formulario
    botonImprimir.disabled = true;
}

