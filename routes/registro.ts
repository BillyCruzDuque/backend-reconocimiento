import {Router} from 'express';
import { check } from 'express-validator';

import {getRegistro, getRegistros, postRegistro} from '../controllers/registros';

import {validarCampos} from '../middlewares/validar-campos';


const router = Router();

router.get(
	'/',
	getRegistros
);
router.get(
	'/:id',
    getRegistro);
    
router.post(
	'/',
    [
        check('id_empleado', 'El id del empleado es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        check('hora_entrada', 'La hora de entrada es obligatorio').not().isEmpty(),
        
		validarCampos,
	],
	postRegistro
);

export default router;
