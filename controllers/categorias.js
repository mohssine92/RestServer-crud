const { response , request } = require('express');
const { Categoria } = require('../models');



// Funcions Controller 

/* obtener caregorias-productos-viajes-etc ... : cuando se trata de estos tipos de objetos siempre tendra como minimo una relacion con un rol de user : siempre segun la logica del negocio */
const obtenerCategorias = async(req, res = response ) => {
  
    //NB: req.body : {}  - req.query : ?q=321&p=fdef - req.params : /:id se prepara la ruta para recibirlo  - req.headers : x-token
    

    // queries vienen por url , limite por default es 5 
    const { limite = 5, desde = 0 } = req.query;

    /* preparo query : en este caso si el estado es false es decir la categoria esta borrada */
    const query = { estado: true };


    /* para mas informaciones sobre los queriees filtros de monggos ver mas ejemplos */
    const [ total, categorias ] = await Promise.all([  // Promise.all nos permite disparar secuencia de promesas que se resuelvan en mismo hilo de tiempo 
       
        Categoria.countDocuments(query), // 1 -promise  en docs segundo arg callback , se trata como promesa 
        Categoria.find(query)            // 2- promise
            .populate('usuario',['nombre']) // ver dos
            .skip( Number( desde ) )   // lo queries llegan en fromato string , asi covertir en number porque las funciones reciben val:number
            .limit( Number( limite ))
    ]);

    res.json({
        total,
        categorias
    });


}

    
/* obtner una unica categoria - un unico producto:fisico-viaje-cualquier servicio que puede pagar por el un cliente . siempre hara falta identificador unico . */
const obtenerCategoria = async(req, res = response ) => {
 
    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                                     .populate('usuario', 'nombre'); 

                                
  /* en caso quiero manipular el onjarto y quiero devolver solo el nombre de user el que crea la categoria :pero en este caso returno tanto id como nobre del user .. dentro del objeto categoria */
   // const {_id, nombre, usuario } = categoria;
   // const { nombre:nameUser } = usuario  
   // const data = { _id , nombre , nameUser}
  

    res.json({
     categoria
    });

}


const crearCategoria = async(req = request , res = response ) => {
 
    // se en body viene categoria y quiero almazenarla en mayuscula
    const nombre = req.body.nombre.toUpperCase();

    // validar si la categoria a grabar existe - siempre esta validacion cuando se trata de grabar algun Objeto irrepetible
    const categoriaDB = await Categoria.findOne({ nombre });
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria  ${ categoriaDB.nombre } , ya existe`
        });
    } 

    /* este es el objeto req Entrante al servidor node desde el cliente  para analizar , durante su viaje pasando mdlrs cualquier objeto puede montar en el por   refe : porque es un objeto Req 
    y los objetos trabajan por referencia - como es el caso de objeto user se ha montado en mdlr */
    console.log(req)


   /* preparo el objeto que quiero grabar , ? poruqe _ porque hay prop del modelo no quiero que el cliente lo inserta , como es el caso de estado lo inserto 
      yo y lo manipulo yo segun mi logica */
    const data = {
        nombre,
        usuario: req.usuario._id // usar el id del jwt : el id del user autenticado , por el body no , me pueden falsificar id :D
    }

    const categoria = new Categoria( data );

    /* Guardar DB
     * tenemos el modelo categoria , asi nada mas registramos el primer categoria , el modelo mongoose genera la coleccion categorias en db automaticlly .
    */
    await categoria.save();

    // usualmente cuando se crea algo se manda el status 201
    res.status(201).json(categoria); 


}


const actualizarCategoria = async( req, res = response ) => {

    /* const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );
 */

    res.json({
        ok: "update ha respondiodo "
    });
}


const borrarCategoria = async(req, res =response ) => {

   /*  const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( categoriaBorrada );
 */
    res.json({
        ok: "borrar ha respomndido"
    });
}





module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
   
    
}