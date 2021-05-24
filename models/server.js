const express = require('express')
var cors = require('cors');

// const { dbConnection } = require('../db/config');




// Tratar servidor como objeto 
// Express basado en classes
class server {


  //es inecesario declarar la props , basta declaralos en el constructor
   constructor(){
     this.app = express();   
     this.port = process.env.PORT;

     // declarar rutas aqui sera facil ver todas rutas que dispone ApiRest
     // cada ruta dispone de endpoints propios , la suma de todos seria los endPoints de RestApi .
     this.userPath = '/api/users';  
     
     // Conectar a db atlass en nube , es um metodo , se ejecuta antes de lod middelware
    //  this.connectarDB();

    // Middelwares : son nada mas fuciones que van a añadir otras funcionalida a mi WebServer  
     this.middlewares();

    // Rutas de mi aplicacion 
    // this.rourtes();

   }

 /*   async connectarDB() {
     // aqui se implemeta varias conexiones a base de datos diferentes usar una o otra ... 
      await dbConnection(); 
   }
 */
   middlewares(){
     // app.use() es los middelware de express ver mas informacion en la doc de express ..
     // Cors , donde configuramos las cabezeras como los dominios que tiene permioso a comunicar a los end-point del Restserver , 
     // Rest-server pudede ser publica , o solo para algunos clientes etc...hay varios escenarios que pudede configura
     this.app.use( cors() );

    // Lectura y parseo del body disparado por Origen o navigador o postman  hacia cierto endpoint  
    // un formulario dispara su post en este especifico punto codificamos valor req en formato json , en objeto json literal 
    this.app.use( express.json() );   
  
    // relacionado a ruta /publica 101.
    // servido en root path
    //http://localhost:8080
    this.app.use(express.static('public'));


   } 

 /*   rourtes() { 
    // middelware : (path , archivo de endpoint a reaccionar depende de metodo http relacionado al path)
    // si se añade el sufijo al dominio el archivo ruta quien reciba los request 
    this.app.use( this.userPath , require('../routes/users'));

   
   }
 */
   listen() {

     this.app.listen(this.port, () => {
        console.log(`Example app listening at http://localhost:${this.port}`)
     })

   }
}



module.exports = server;