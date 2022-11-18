"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.putEmpleado = exports.postEmpleado = exports.getEmpleado = exports.getEmpleados = void 0;
const empleado_1 = __importDefault(require("../models/empleado"));
const getEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empleado = yield empleado_1.default.findAll();
    res.status(200).json({
        ok: true,
        msg: 'Todos los empleado',
        empleado,
    });
});
exports.getEmpleados = getEmpleados;
const getEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const empleado = yield empleado_1.default.findByPk(id);
    if (empleado) {
        res.status(200).json({
            ok: true,
            msg: 'Empleado encontrado',
            empleado,
        });
    }
    else {
        res.status(404).json({
            ok: false,
            msg: `No existe un empleado con el id ${id}`,
        });
    }
});
exports.getEmpleado = getEmpleado;
const postEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, puesto, telefono, direccion } = req.body;
    try {
        const existeEmpleado = yield empleado_1.default.findOne({
            where: {
                nombre: nombre,
            }
        });
        if (existeEmpleado) {
            return res.status(400).json({
                ok: false,
                msg: 'El empleado ya existe: ' + nombre,
            });
        }
        // @ts-ignore
        const empleado = new empleado_1.default({ nombre, apellido, puesto, telefono, direccion });
        yield empleado.save();
        res.status(201).json({
            ok: true,
            msg: 'Empleado creado',
            empleado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear empleado || Hable con el administrador'
        });
    }
});
exports.postEmpleado = postEmpleado;
const putEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const empleado = yield empleado_1.default.findByPk(id);
        if (!empleado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con el id: ' + id,
            });
        }
        yield empleado.update(body);
        res.status(200).json({
            ok: true,
            msg: 'Empleado actualizado',
            empleado,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear empleado || Hable con el administrador'
        });
    }
});
exports.putEmpleado = putEmpleado;
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const empleado = yield empleado_1.default.findByPk(id);
    if (!empleado) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un empleado con el id: ' + id,
        });
    }
    yield empleado.update({
        estado: false,
    });
    res.status(200).json({
        ok: true,
        msg: 'Empleado Desactivado',
        empleado
    });
});
exports.deleteEmpleado = deleteEmpleado;
//# sourceMappingURL=empleados.js.map