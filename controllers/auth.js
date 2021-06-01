const { response } = require('express');

const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {
  
  // Extraer las propiedad que quiero que llegan atraves del body del cliente 
  const { correo, password } = req.body;

  try {
     
     // verificar si el email existe
     const usuario = await Usuario.findOne({ correo }); // recuerda que correo es una propiedad interna de nuestro modelo , 
     console.log(' objeto de tipo user recuperado por correo :',usuario);


      if ( !usuario ) {
          return res.status(400).json({
            //  msg: 'Usuario / Password no son correctos - correo'
                msg: 'El correo Introducido No existe en nuestra base de datos' 
          });
      }

      if( !usuario.estado ) {  // es booleana false
          return res.status(400).json({
             //  msg: 'Usuario / Password no son correctos - password'
             msg: 'Usuario esta borrado o desactivado temporalmente'
          });
      }

      // Verificar la contraseña existente si es correcta
      const validPassword = bcryptjs.compareSync( password, usuario.password );   
      if ( !validPassword ) {
          return res.status(400).json({
             // msg: 'Usuario / Password no son correctos - password'
              msg: 'password introducido no es correcto'
          });
      }

      // Generar el JWT
      // cada vez se autentica se genera un JWT nuevo
      // lo que voy a almazanar en jwt en este caso solo id , por favor no almazenar datios sensibles , porque se decifra el apyload del lado del cliente 
      const token = await generarJWT( usuario.id );


     // no usamos return porque usalmente res , es el ultimo que debo ejecutar , no puede mandar 2 respuesta en el mismo proceso ,
     // proceso lo que tengo perocesar y mandlo lo que debo mandar , siempre segun la tarea . que debe hacer el servicio . 
     res.json({
       usuario,
       token
     
     })


  } catch (error) {
     // status 500 es algo no debe disparares , si se dispara es algo falla en mi codigo
     console.log(error)
     res.status(500).json({  
        msg: 'Hable con el administrador'
     });

  }
        



}



module.exports = {
    login
}
