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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.status(200).json({
        ok: true,
        msg: 'Todos los usuarios',
        usuarios,
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.status(200).json({
            ok: true,
            msg: 'Usuario encontrado',
            usuario,
        });
    }
    else {
        res.status(404).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`,
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, estado, password } = req.body;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: email,
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe!!!!: ' + email,
            });
        }
        // @ts-ignore
        const usuario = new usuario_1.default({ nombre, email, estado, password });
        // Encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync(11);
        // @ts-ignore
        usuario.password = bcryptjs_1.default.hashSync(password, salt);
        yield usuario.save();
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario || Hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id,
            });
        }
        yield usuario.update(body);
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario || Hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con el id: ' + id,
        });
    }
    yield usuario.update({
        estado: false,
    });
    res.status(200).json({
        ok: true,
        msg: 'usuario Desactivado',
        usuario
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map