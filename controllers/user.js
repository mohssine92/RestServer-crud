

const { response , request } = require('express');

// Imporatacion de models 
 const Usuario = require('../models/usuario');


// Controladores de end-points del recurso /usuarios .

const UsersGet = async (req = request, res = response ) => {
  //recibir params opcionales es decir los queries ?..&..&.. 
  // http://localhost:8080/api/users?q=232&s=11323234&apiKey=679788&name=mohssine
  // http://localhost:8080/api/users?desde=5&limit=2
  
  // const {q , apiKey , name = 'No-name', page=1 , limit} = req.query;

  // los queries son argumentos de los Segmento url .-
  const { limit= 5, desde } = req.query;
  // condicion en la consulta , filtro , true = existe , estado = false user fue borrado . 
  const query = {estado: true};



  // promise all ejecuta promesas independientes en mismo hilo de tiempo , ganar tiempo en resolver
  // sera util cuando una promesa no es depende de la respuesta de la promesa anterior
  // returna coleccion de resultados de las promesas 
  const [ totalUserStored, usuarios ] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
        .skip( Number(desde) )
        .limit( Number(limit) )
  ]);
  /* const usuarios = await Usuario.find(query)  
                                .skip(Number(desde)) 
                                .limit(Number(limit));
 */
  // calcular total de objeto devueltos 
  //  const userStored = await Usuario.find();                             
  // const totalUserStored = userStored.length;              
  // alternativas : Retormar numero total de registros en una colleccion
  // const totalUserStored = await Usuario.countDocuments(query); 



  // la respuesta al req sera en formato Json 
   res.json({
     totalUserStored,
     usuarios
                   
   }) // ECM6 // objeto de respuesta 
  
  


  

}



module.exports ={
  UsersGet
  
}