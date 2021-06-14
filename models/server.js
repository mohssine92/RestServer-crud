const express = require('express')
var cors = require('cors');

const { dbConnection } = require('../db/config');




// Tratar servidor como objeto 
// Express basado en classes
class Server {


  //es inecesario declarar la props , basta declaralos en el constructor
   constructor(){
     // express() es la funcion servidor
     this.app = express();   
     this.port = process.env.PORT;

    /* Definir rutas ApiRest en el servidor , sino la defino no estara reconocida por mi servidore 
       cada ruta dispone de endpoints propios , la suma de todos seria los endPoints de RestApi */
    this.paths = {
      auth:       '/api/auth',
      buscar:     '/api/buscar',
      categorias: '/api/categorias',
      productos:  '/api/productos',
      usuarios:   '/api/users',
    }
  
     
     // Conectar a db atlass en nube , es um metodo , se ejecuta antes de lod middelware
     this.connectarDB();

    // Middelwares : son nada mas fuciones que van a añadir otras funcionalida a mi WebServer  
     this.middlewares();

    // Rutas de mi aplicacion 
     this.routes();

   }

   async connectarDB() {
     // aqui se implemeta varias conexiones a base de datos diferentes usar una o otra ... 
      await dbConnection(); 
   }

   middlewares(){
     // app.use() es los middelware de express ver mas informacion en la doc de express ..
     // Cors , donde configuramos las cabezeras como los dominios que tiene permioso a comunicar a los end-point del Restserver , 
     // Rest-server pudede ser publica , o solo para algunos clientes etc...hay varios escenarios que pudede configura
     this.app.use( cors() );

     /* Lectura y parseo del body disparado por Origen o navigador o postman por cliente  hacia todos nuestrs end-points en esta configuracion 
      Ex : un formulario dispara su post en este especifico punto codificamos valor req en formato json , en objeto json literal  */
     this.app.use( express.json() );   
  
  
    //http://localhost:8080 - pagina statica a cargar en el dominio - express funcion paquete 
    this.app.use(express.static('public'));


   } 

   routes() { 
     /* middelware de express , definimos un archivo de routas/servicios/endpoints por cada ruta entrante .*/
    this.app.use( this.paths.usuarios, require('../routes/users'));
    this.app.use( this.paths.buscar, require('../routes/buscar'));
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.categorias, require('../routes/categorias'));  
    this.app.use( this.paths.productos, require('../routes/productos')); 

   }

   listen() {
     this.app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
     })

   }
}



module.exports = Server;