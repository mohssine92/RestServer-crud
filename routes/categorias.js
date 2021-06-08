const { Router }= require('express');
const { check } = require('express-validator');



// Middelwares - conocido como mdlr perzonalizado 
  
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


// Controllers de esta routa 
const { obtenerCategorias,
        obtenerCategoria,
        crearCategoria,
        actualizarCategoria,
        borrarCategoria
} = require('../controllers/categorias');


// Helpers
const { existeCategoriaPorId } = require('../helpers/db-validators');




// Router funccion extraeda del paquete express 
 const router = Router();


/** asi sera en postman 
 * {{url}}/api/categorias
 * usualmente siempre vamos a necesitar estos 5 servicios rest ,    
 */


/* Obtener todas las categorias - este servicios lo voy a poner publico : es decir cualquiera consigue este path va poder ver todas categorias : productos-viajes-ofertas , relmente empezemos a     restringir y requerir cuando un determina user empieza 
a poner serio como reservar comprar alli empieza las accion donde empezemos a interectuar con servicios de autenticar , insersacion de metodo de pago etc .   */
router.get('/', obtenerCategorias );


/* Obtener una categoria por id - este servicios lo voy a poner publico : es decir cualquiera consigue este path va poder ver un categoria por id .
 * obtener informacion de un objeto como es categoria-producto-curso-viaje : cualquier rol autenicado correctamente o no esta autenticado en el systema 
   puede obtenerlo porque la razon es vender y para vender cualquiera debe ver informacion sobre el producto .
*/
router.get('/:id',[
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos

], obtenerCategoria ); // obtener objeto suele recibir parm identificador en el url 



// Crear categoria - privado - cualquier persona con un token válido : en este caso , pero puedo especificar restringir acceso aumenter nivel de mdlrs
/* TODO : si quiero solo un rol que puede crear categorias lo añado en los mldrs , es la misma logica para : cursos-productos-viajes : todo lo que puede inventar
 un rol user : siempre depende de la logica del negocio */
router.post('/', [ 
   validarJWT,
   check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria ); // crear objeto  suele recibir body , headers : jwt



// Actualizar - privado - cualquier persona con un token válido : tenemos que implementar mdlrs validacion . 
router.put('/:id',[
    //validarJWT,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria ); // suele recibir param identificador en el  url del objeto a actualizar y un body con nueva version del objeto , headers : jwt



// Borrar una categoria - Restringit : validacion solo el admin tendra permiso a borra categoria , depende del proyecto y la logica del negocio
// nosotros en nuestra filosofia no borramos objeto , solo cambiamos prop interna estado : por false . si es false se considera borrado en la logica
router.delete('/:id',[
      //validarJWT,
      //esAdminRole,
      //check('id', 'No es un id de Mongo válido').isMongoId(),
      //check('id').custom( existeCategoriaPorId ),
      validarCampos,
], borrarCategoria ); // suele recibir param identificador del objeto a borra y headers : jwt





 /*  hay que exportar router que va emitir res del proceso de cada sevicio ha sido llamado , asi podemos usarlo en el servidor de express . en un mdlr   */
module.exports = router;