const Role = require('../models/role')
const Usuario = require('../models/Usuario')

// validacion relacionada a db - utulizada por meddlware 
const esRoleValido = async(rol = '' ) =>{

    if( rol == '') {
      throw new Error(`no se puede mandar campo rol vacio `)     
    }

    const existRole = await Role.findOne({ rol });
    if ( !existRole ) {
      throw new Error(`El rol  ${ rol } no se encuentra en base de datos `)       
    }  
    // la idea es que el cliente de front-end debe mandar rol que existe realmente en la logica del negocio .
}

// esta validacion para rol en actualizar objeto user , la idea no es requerido actualizarlo
const esRoleValidoUp = async(rol = null ) =>{
  if( rol != null ){
    const existRole = await Role.findOne({ rol });
    if ( !existRole ) {
      throw new Error(`El rol  ${ rol } no se encuentra en base de datos `)       
    }  
  }
}

 
// validacion relacionada a db  utulizada por middlware 
const emailExiste = async (correo = '') => {
  //verificar si el correo existe , Usuario es el modelo de monggose , nos ofrece varios funciones como tal : 
  const existeEmail = await Usuario.findOne({ correo });
  if ( existeEmail ){
    throw new Error(`El email  ${ correo } ya se encuentra registrado `)   
  }
}

const existeUsuarioPorId = async ( id ) => {

  // verificar si objeto con este id existe : antes de editar , eleminar 
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ) {
      throw new Error(`El id no existe ${ id }`);
      // la logica es si no existe id pues no hay id a actualizar
  }
}

const veririficIfIsNumber = async ( limit ) => {
 
  // evitar error si los args llegan vacios
  if(limit == undefined){ 
    limit = '0';
  }
  

  // como todos valores tanto numeros como letras se reciben en formato string , debe sacar los caracteres permitidos en este caso son numeros .
  validar = false;
  let numeros = [];
  for (let number = 0; number <100 ; number++) { // instruccion bloqueante 
    numeros.push(number.toString()); 
  }
 // console.log(numeros);
  numeros.forEach( n => {
  //  console.log(n);
    if(limit == n ){
      validar = true;
    }
  });

  if ( validar == false) {
    throw new Error(`introduzca un valor numeral `);
  }
  
}





module.exports = {
 esRoleValido,
 emailExiste,
 existeUsuarioPorId,
 esRoleValidoUp,
 veririficIfIsNumber
 
}

