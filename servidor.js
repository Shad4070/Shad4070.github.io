var http = require( "http" );
var fs = require( "fs" );

// Crear una instancia del servidor HTTP
var server = http.createServer( atenderServidor );

console.log( "Servidor iniciado" );

// Iniciar la escucha del servidor en el puero 8088
server.listen( 8088 );

//   CoffeeScript o TypeScript
function atenderServidor( request, response ){
	console.log( "Peticion recibida : " + request.url );
	
	 if( request.url == "/estilo.css"){
        estilo(request,response);
	}else if (request.url == "/productos") {
		lasCosas(request, response);
	}else if(request.url=="/insertar.html"){
		insertarVista(request,response);
	}else if(request.url=="/inser"){
		insertar(request, response);
	}
	else {
		retornarArchivo( request, response );
	}
}
//Vector que va a almacenar los usuarios registrados

var usuarios = [];
var productos=[];

var s = fs.readFile("productos.json",cargarUsuario);

function insertar(request, response){
	request.on("data",recibir);
	console.log("entro1");
	//callback
	function recibir(data){
		var pro=JSON.parse(data);
		productos.push(pro);
		fs.writeFile("productos.json", JSON.stringify(productos), null);
		response.end("Agregado correctamente");
	}
}

function cargarUsuario(error,data) {
	if (error == null) {
		usuarios = JSON.parse(data);
		console.log("Los usuarios registrados son: ");
		console.log(usuarios);
	}else{
		console.log(error);
		response.end(error.toString());
	}
}

function guardarRegistro(request, response) {
	// Programa el Callback
	request.on("data", recibir);
	// Callback que recibe el cuerpo del POST
	function recibir(data) {
		console.log(data.toString());
		var pro = JSON.parse(data);
		// Agregar al vector
		productos.push(pro);
		fs.writeFile("productos.json",JSON.stringify(productos), null);
		response.end("Ya recibimos el producto");

	}
}



function retornarArchivo( request, response ){
  fs.readFile(".\\"+'index.html', archivoListo );
  
  function archivoListo( error, data ){
	if( error == null ){
		response.write( data );
		response.end();
	} else {
		console.log( error );
		response.end( error.toString() );
	}
  }
}

function lasCosas(request, response){
	fs.readFile(".\\"+"productos.json", archivoListo);
  
 	 function archivoListo( error, data ){
		if( error == null ){
			response.write( data );
			response.end();
		} else {
			console.log( error );
			response.end( error.toString() );
		}
  	}
}
function estilo(request,response) {
	/*fs.readFile(".\\"+'productos.json', archivoListo );
  
  function archivoListo( error, data ){
	if( error == null ){
		response.write( data );
		response.end();
	} else {
		console.log( error );
		response.end( error.toString() );
	}
  }*/
  fs.readFile(".\\"+"estilo.css", indice);
  function indice(error, data){
  	if(error==null){
  		response.write(data);
  		response.end();
  	}else{
  		console.log(error);
  		response.end(error.toString());
  	}
  }

}

function insertarVista(request, response){
  	fs.readFile(".\\"+"insertar.html", indice);
  	function indice(error, data){
  		if(error==null){
  			response.write(data);
  			response.end();
  		}else{
  			console.log(error);
  			response.end(error.toString());
  		}
  	}
}







