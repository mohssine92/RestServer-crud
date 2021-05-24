const { validationResult } = require("express-validator");



// un middle no es nada que una funcion
const validarCampos = (req, res, next) => {
  
  // errores acumulados en req , con los middelware de express-validator , si no se acmular nada pues sera empty
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json(errors); 
  }

   // si no returna respuesta de errores , pues pasamos a la ejecuccion del siguiente instruccion es lo que hace exactamente esta funcion de next.
   next();

}


module.exports = {
  validarCampos
}