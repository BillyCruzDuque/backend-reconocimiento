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
exports.postRegistro = exports.getRegistro = exports.getRegistros = void 0;
const registro_1 = __importDefault(require("../models/registro"));
const connection_1 = __importDefault(require("../db/connection"));
const getRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield registro_1.default.findAll();
    res.status(200).json({
        ok: true,
        msg: 'Todos los Registros',
        registro,
    });
});
exports.getRegistros = getRegistros;
const getRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const registro = yield registro_1.default.findByPk(id);
    if (registro) {
        res.status(200).json({
            ok: true,
            msg: 'Registro encontrado',
            registro,
        });
    }
    else {
        res.status(404).json({
            ok: false,
            msg: `No existe un registro con el id ${id}`,
        });
    }
});
exports.getRegistro = getRegistro;
const postRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_empleado, fecha, hora_entrada } = req.body;
    try {
        const existeRegistro = yield connection_1.default.query(`SELECT * FROM registros WHERE id_empleado = ${id_empleado} AND fecha = '${fecha}'`);
        if (existeRegistro[0].length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El registro ya existe!!!!',
            });
        }
        // @ts-ignore
        const registro = new registro_1.default({ id_empleado, fecha, hora_entrada });
        yield registro.save();
        res.status(201).json({
            ok: true,
            msg: 'Registro creado',
            registro,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear registro || Hable con el administrador'
        });
    }
});
exports.postRegistro = postRegistro;
//# sourceMappingURL=registros.js.map