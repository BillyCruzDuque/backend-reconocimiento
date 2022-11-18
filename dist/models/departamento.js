"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Departamento = connection_1.default.define('Departamento', {
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    tableName: 'departamentos',
});
exports.default = Departamento;
//# sourceMappingURL=departamento.js.map