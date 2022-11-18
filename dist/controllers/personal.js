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
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getPersonal = void 0;
const personal_1 = __importDefault(require("../models/personal"));
const getPersonal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personal = yield personal_1.default.findAll();
    res.status(200).json({
        ok: true,
        msg: 'Todo el personal',
        personal,
    });
});
exports.getPersonal = getPersonal;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield Usuario.findByPk(id);
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
        const existeEmail = yield Usuario.findOne({
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
        const usuario = new Usuario({ nombre, email, estado, password });
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(11);
        // @ts-ignore
        usuario.password = bcryptjs.hashSync(password, salt);
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
        const usuario = yield Usuario.findByPk(id);
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
    const usuario = yield Usuario.findByPk(id);
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
//# sourceMappingURL=personal.js.map