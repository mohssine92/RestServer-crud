// ahora tengo constantes que tienen todo lo que exportan estos archivo .

const validarCampos  = require('../middlewares/validar-campos');
const validarJWT  = require('../middlewares/validar-jwt');
const validacionRoles   = require('../middlewares/validar-roles');  

module.exports = {
  ...validarCampos,
  ...validarJWT,
  ...validacionRoles

}


