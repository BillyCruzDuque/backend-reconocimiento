"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentos_1 = require("../controllers/departamentos");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = (0, express_1.Router)();
router.get('/', departamentos_1.getDepartamentos);
router.get('/:id', departamentos_1.getDepartamento);
router.post('/', [
    validar_campos_1.validarCampos,
], departamentos_1.postDepartamento);
router.put('/:id', departamentos_1.putDepartamento);
router.delete('/:id', departamentos_1.deleteDepartamento);
exports.default = router;
//# sourceMappingURL=departamento.js.map