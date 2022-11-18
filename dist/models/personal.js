"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Personal = connection_1.default.define('Personal', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    salario: {
        type: sequelize_1.DataTypes.INTEGER
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'personal',
});
exports.default = Personal;
//# sourceMappingURL=personal.js.map