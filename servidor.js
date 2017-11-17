var http = require( "http" );
var fs = require( "fs" );

// Crear una instancia del servidor HTTP
var server = http.createServer( atenderServidor );

console.log( "Servidor iniciado" );

// Iniciar la escucha del servidor en el puero 8088
server.listen( process.env.PORT || 80);

//   CoffeeScript o TypeScript
//Oscar Rios
function atenderServidor( request, response ){
	console.log( "Peticion recibida : " + request.url );

	 if( request.url == "/estilo.css"){
        estilo(request,response);
	}else if (request.url == "/productos") {
		lasCosas(request, response);
	}else if(request.url=="/insertar.html"){
		insertarVista(request,response);
	}else if(request.url=="/loggincafe.html"){
		logginUsuario(request,response);
	}else if(request.url=="/inser"){
		insertar(request, response);
	}else if(request.url=="/categor"){
		cosasCatego(request, response);
	}else if(request.url=="/inserCat"){
		inserCat(request, response);
	}else if(request.url=="/verificarUsuario"){
		verificarUsuario(request,response);
	}else if(request.url=="/registrar"){
		insertarUsuario(request,response);
	}else if(request.url=="/registrarusuario"){
		crearUsuario(request,response);
	}else if(request.url=="/index.html"){
		alIndex(request,response);
	}else if(request.url=="/buscarNombre"){
		alIndex(request,response);
	}else if(request.url=="/buscarId"){
		alIndex(request,response);
	}else if(request.url=="/buscar.html"){
		buscarVista(request,response);
	}else{
		logginUsuario( request, response );
	}
}
//Vector que va a almacenar los usuarios registrados

var usuarios = [];
var auxusers=[];
var productos=[];
var categorias=[];


var users=[
	{usuario:"alejandro1995",clave:"alejandro2426",correo:"madridu42@hotmail.com"},
	{usuario:"williamdsw",clave:"dsw2426",correo:"wdvelasques@udem.edu.co"}
]



var s = fs.readFile("productos.json",cargarUsuario);
var a=fs.readFile("categoria.json",cargarUsuario);

//alejandro
function crearUsuario(request,response){
	var existe = usuarioExiste();

	if(existe == false){
		request.on("data",recibir);

		function recibir(data){
			var usr=JSON.parse(data);
			console.log(usr);
			users.push(usr);
			fs.writeFile("nuevousuario.json", JSON.stringify(users), null);
			console.log(users);
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
		console.log(usr);
		if(usuarioExiste(usr.usuario,usr.clave,usr.correo)){
			res.writeHead(200,{ 'content-type': 'text/html'});
			res.end( "usuario correcto");
		}else{
			res.writeHead(401, { 'content-type': 'text/html' });
			res.end( "Usuario incorrecto" );
		}
	}
}

//alejandro
function usuarioExiste(nombr,clave,correo){
	for(var i=0; i < users.length;i++){
		if(users[i].usuario == nombr && users[i].clave == clave && users[i].correo==correo){
			return true;
		}
	}
	return false;
}

//Oscar Rios
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
//Oscar Rios
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

function cargarProductos(error,data){
	if(error == null){
		productos = JSON.parce(data);
		console.log("los productis registrados son: ");
		console.log(productos);
	}else{
		console.log(error);
		response.end(error.toString());
	}
}

//Oscar Rios
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


//Oscar Rios
function retornarArchivo( request, response ){
  fs.readFile(__dirname+'/loggincafe.html', archivoListo );

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

//Oscar Rios
function alIndex( request, response ){
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

//Oscar Rios
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

//Oscar Rios
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

//Oscar Rios
function estilo(request,response) {

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
function insertarUsuario(request,response){
	fs.readFile(__dirname+"/registrarUsuario.html",indice);
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

//alejandro
function logginUsuario(request,response){
	fs.readFile(__dirname+"/loggincafe.html",indice);
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

//Oscar Rios
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

//Luis Lopez
	function buscarVista(request, response){
	  	fs.readFile(__dirname+"/buscar.html", indice);
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
