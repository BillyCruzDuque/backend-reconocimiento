"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Registro = connection_1.default.define('Registro', {
    id_empleado: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    hora_entrada: {
        type: sequelize_1.DataTypes.TIME
    },
}, {
    tableName: 'registros',
});
exports.default = Registro;
//# sourceMappingURL=registro.js.map