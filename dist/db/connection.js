"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('reconocimiento', 'root', '123456789', {
    host: '192.168.1.120',
    dialect: 'mysql',
    port: 3306
});
exports.default = db;
//# sourceMappingURL=connection.js.map