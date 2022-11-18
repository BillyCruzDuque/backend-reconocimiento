"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const empleados_1 = require("../controllers/empleados");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', empleados_1.getEmpleados);
router.get('/:id', empleados_1.getEmpleado);
router.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellido', 'El apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('puesto', 'El puesto es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('direccion', 'La direccion es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos,
], empleados_1.postEmpleado);
router.put('/:id', empleados_1.putEmpleado);
router.delete('/:id', empleados_1.deleteEmpleado);
exports.default = router;
//# sourceMappingURL=empleado.js.map