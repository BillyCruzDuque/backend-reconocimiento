import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Registro = db.define('Registro', {
    id_empleado: {
        type: DataTypes.INTEGER,
    },
    fecha: {
        type: DataTypes.DATE,
    },
    hora_entrada: {
        type: DataTypes.TIME
    },
    
}, {
    tableName: 'registros',
});

export default Registro;