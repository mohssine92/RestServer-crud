const { Router }= require('express');




const { UsersGet } = require('../controllers/user');



const router = Router();


// Restapi Endpoints , para Recurso de users:


// le paso Referencia de funcion UserGet , le ejecuta a su tiempo
 router.get('/', UsersGet) 





module.exports = router;