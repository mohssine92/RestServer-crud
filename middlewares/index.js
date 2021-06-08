// ahora tengo constantes que tienen todo lo que exportan estos archivo .

const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const validacionRoles   = require('../middlewares/validar-roles');  

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validacionRoles 
 /* en este ejemplo esplico el caso , validacionRoles  esta exportada pero ojo validacionRoles  consta de varias funciones exportadas , asi estas funciones seran desestructuradas directamente en el archivo donde sera importado este archivo , gracias 
    a operador spreat ...validacionRoles  */

}


