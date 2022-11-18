import {Router} from 'express';
import { check } from 'express-validator';

import {deleteEmpleado, getEmpleado, getEmpleados, postEmpleado, putEmpleado} from '../controllers/empleados';

import {validarCampos} from '../middlewares/validar-campos';


const router = Router();

router.get(
	'/',
	getEmpleados
);
router.get(
	'/:id',
    getEmpleado);
    
router.post(
	'/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('puesto', 'El puesto es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
		validarCampos,
	],
	postEmpleado
);
router.put('/:id', putEmpleado);
router.delete('/:id', deleteEmpleado);


export default router;
