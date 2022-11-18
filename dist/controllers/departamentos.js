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
exports.deleteDepartamento = exports.putDepartamento = exports.postDepartamento = exports.getDepartamento = exports.getDepartamentos = void 0;
const departamento_1 = __importDefault(require("../models/departamento"));
const getDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departamentos = yield departamento_1.default.findAll();
    res.status(200).json({
        ok: true,
        msg: 'Todos los departamentos',
        departamentos,
    });
});
exports.getDepartamentos = getDepartamentos;
const getDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamento = yield departamento_1.default.findByPk(id);
    if (departamento) {
        res.status(200).json({
            ok: true,
            msg: 'departamento encontrado',
            departamento,
        });
    }
    else {
        res.status(404).json({
            ok: false,
            msg: `No existe un departamentos con el id ${id}`,
        });
    }
});
exports.getDepartamento = getDepartamento;
const postDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion } = req.body;
    try {
        const existeDepartamento = yield departamento_1.default.findOne({
            where: {
                descripcion: descripcion,
            }
        });
        if (existeDepartamento) {
            return res.status(400).json({
                ok: false,
                msg: 'El Departamento ya existe!!!!: ' + descripcion,
            });
        }
        // @ts-ignore
        const departamento = new departamento_1.default({ descripcion });
        yield departamento.save();
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            departamento,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear departamento || Hable con el administrador'
        });
    }
});
exports.postDepartamento = postDepartamento;
const putDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const departamento = yield departamento_1.default.findByPk(id);
        if (!departamento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un departamento con el id: ' + id,
            });
        }
        yield departamento.update(body);
        res.status(200).json({
            ok: true,
            msg: 'departamento actualizado',
            departamento,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear departamento || Hable con el administrador'
        });
    }
});
exports.putDepartamento = putDepartamento;
const deleteDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamento = yield departamento_1.default.findByPk(id);
    if (!departamento) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un departamento con el id: ' + id,
        });
    }
    yield departamento.update({
        estado: false,
    });
    res.status(200).json({
        ok: true,
        msg: 'departamento Desactivado',
        departamento
    });
});
exports.deleteDepartamento = deleteDepartamento;
//# sourceMappingURL=departamentos.js.map