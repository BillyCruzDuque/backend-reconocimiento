"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const registros_1 = require("../controllers/registros");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', registros_1.getRegistros);
router.get('/:id', registros_1.getRegistro);
router.post('/', [
    (0, express_validator_1.check)('id_empleado', 'El id del empleado es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('hora_entrada', 'La hora de entrada es obligatorio').not().isEmpty(),
    validar_campos_1.validarCampos,
], registros_1.postRegistro);
exports.default = router;
//# sourceMappingURL=registro.js.map