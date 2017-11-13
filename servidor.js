var http = require( "http" );
var fs = require( "fs" );

// Crear una instancia del servidor HTTP
var server = http.createServer( atenderServidor );

console.log( "Servidor iniciado" );

// Iniciar la escucha del servidor en el puero 8088
server.listen( process.env.PORT || 8080);

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
	}else if(request.url=="/categor"){
		cosasCatego(request, response);
	}else if(request.url=="/inserCat"){
		inserCat(request, response);
	}
	else {
		retornarArchivo( request, response );
	}
}
//Vector que va a almacenar los usuarios registrados

var usuarios = [];
var auxusers=[];
var productos=[];
var categorias=[];



var s = fs.readFile("productos.json",cargarUsuario);
var a=fs.readFile("categoria.json",cargarUsuario);

//alejandro
function crearUsuario(request,response){
	var existe = usuarioExiste();
	
	if(existe == false){
		request.on("data",recibir);
		
		function recibir(data){
			var pro=JSON.parse(data);
			auxusers.push(pro);
			fs.writeFile("nuevousuario.json", JSON.stringify(auxusers),null);
			response.end("Usuario registrado correctamente");
			
		}
		
	}else{
		alert("el usuario ya existe");
	}
}

//alejandro
function verificarUsuario(req,res){
	req.on('data',datosListos);
	function datosListos(content){
		var usr=JSON.parse(content);
		if(usuarioExiste(usr.email,usr.clave)){
			res.writeHead(200,{ 'content-type ': 'text/html'});
			res.end( "usuario correcto");
		}else{
			res.writeHead(401, { 'content-type': 'text/html' });
			res.end( "Usuario incorrecto" );
		}
	}
}

//alejandro
function usuarioExiste(archivo,nombr,clave){
	archivo=fs.readFile("nuevousuario.json",cargarUsuario);
	for(var i=0, i < archivo.length;i++){
		if(archivo[i].usuario == nombr && archivo[i].clave == clave){
			return true;
		}
	}
	return false;
}


function insertar(request, response){
	request.on("data",recibir);
	//callback
	function recibir(data){
		var pro=JSON.parse(data);
		productos.push(pro);
		fs.writeFile("productos.json", JSON.stringify(productos), null);
		response.end("Agregado correctamente");
	}
}

function inserCat(request, response){
	request.on("data",recibir);
	//callback
	function recibir(data){
		var cat=JSON.parse(data);
		categorias.push(cat);
		fs.writeFile("categoria.json", JSON.stringify(categorias), null);
		response.end("Agregado correctamente");
	}
}

function cargarUsuario(error,data) {
	if (error == null) {
		usuarios = JSON.parse(data);
		console.log("Los items registrados son: ");
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
  fs.readFile(__dirname+'/index.html', archivoListo );
  
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

//alejandro
function users(request,response){
	fs.readFile(__dirname+"/nuevousuario.json", archivoListo);
  
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
	fs.readFile(__dirname+"/productos.json", archivoListo);
  
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

function cosasCatego(request, response){
	fs.readFile(__dirname+"/categoria.json", archivoListo);
  
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
	/*fs.readFile(__dirname+'productos.json', archivoListo );
  
  function archivoListo( error, data ){
	if( error == null ){
		response.write( data );
		response.end();
	} else {
		console.log( error );
		response.end( error.toString() );
	}
  }*/
  fs.readFile(__dirname+"/estilo.css", indice);
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

//alejandro
function insertarUsuario(request,reponse){
	fs.readFile(__dirname,"/registrarUsuario.html",indice){
		function indice(error,data){
			if(error==null){
				response.write(data);
				response.end();
			}else{
				console.log(error);
				response.end(error.toString());
			}
		}
	}
}

function insertarVista(request, response){
  	fs.readFile(__dirname+"/insertar.html", indice);
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








