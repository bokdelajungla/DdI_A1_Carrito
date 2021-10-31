/**
 * JS para Carrito de la compra
 * 
 * Repositorio del proyecto: https://github.com/bokdelajungla/DdI_A1_Carrito
 *   
 */

/* Variables */
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

/* Ejecución al cargar la página */
window.onload=function(){
    inicializar();
    setManejadorEventos();
}

/**
 * Función que inicializa las variables a sus correspondientes valores
 * y fija la visibilidad inicial de los elementos
 * 
 */
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
    cvv.style.size="3";
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

/**
 * Función que asigna los escuchadores a los elementos interactivos
 * 
 */
function setManejadorEventos(){
    document.formulario.botonAddArticulo.addEventListener("click", addArticulo);
    fPago.addEventListener("change", cargarPago);
    aceptar.addEventListener("change", haAceptado);
    document.formulario.botonImprimir.addEventListener("click", imprimir);
    document.formulario.botonRestablecer.addEventListener("click", restablecer)

    //Para método pago tarjeta
    titular.addEventListener("blur", validarTarjeta);
    numTarjeta.addEventListener("blur", validarTarjeta);
    cvv.addEventListener("blur", validarTarjeta);
}

/**
 * Función para añadir un artículo a la lista del carrito
 * 
 */
function addArticulo(){
    //Visibilidad
    //Reiniciamos la visibilidad a su estado inicial
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
    else{
        //Si falta el precio
        if(precio.value===""){
            precio.focus();
            faltaPrecio.style.display="inline";
        }
        //En caso de el precio sea incorrecto
        else{
            precioIncorrecto.style.display="inline";
            precio.focus();
        }
        //Si el artículo está vacío
        if(articulo.value===""){
            faltaArticulo.style.display="inline";
            articulo.focus();
        }
        
    }
}

/**
 * Compueba el precio. Si parseFloat devuelve un numero entonces devuelve "true"
 * Si no devuelve "false"
 * 
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
        alert("Seleccione una forma de pago");
    }
}

/*
Resetea los campos del formulario y hace focus al articulo
*/
function restablecer(){

    //Hacer foco Artículo
    articulo.focus();
    //Volvemos a la visibilidad por defecto
    capaTarjeta.style.display="none";
    capaEfectivo.style.display="none";
    faltaPrecio.style.display="none";
    faltaArticulo.style.display="none";
    precioIncorrecto.style.display="none";
    //total.value = "0"; //No hace falta porque ya se resetea por el formulario
    //Desactivar el botón Imprimir 
    botonImprimir.disabled = true;
}

/**
 * Valida los campos que aparecen al seleccionar el método de pago tarjeta
 * 
 */
function validarTarjeta(){
    //Flag de Error
    var error = false;
    //Comprobar que el Titular tiene forma de nombre
    //Empieza por palabra de 3 o más letras, seguido de espacio y otra palabra
    if(!titular.value.match(/^(\w{3,})\s?(\w{3,})/)){
        falloTarjeta.style.display="block";
        titular.className = "error";
        error=true;
    }
    else{ //Si Titular está correcto
        titular.className = "";
        errorTitular.style.display="none";
    } 
    //Comprobar que el numTarjeta contiene exactamente 16 dígitos
    if(!numTarjeta.value.match(/^\d{16}$/)){
        falloTarjeta.style.display="block";
        numTarjeta.className = "error";
        error=true;
    }
    else{ //Si Num Tarjeta está correcto
        numTarjeta.className = "";
        errorNumTarjeta.style.display="none";
    }
    //Comprobar que el CVV tiene 3 dígitos
    if(!cvv.value.match(/^\d{3}$/)){
        falloTarjeta.style.display="block";
        cvv.className = "error";
        error=true;
    }
    else{ //Si CVV está correcto
        cvv.className = "";
        errorCvv.style.display="none";
    }
    
    //Si ninguno ha dado error, ocultamos el span
    if(!error){
        falloTarjeta.style.display="none";        
    }

}