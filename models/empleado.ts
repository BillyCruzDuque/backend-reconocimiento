import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Empleado = db.define('Empleado', {
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    puesto:{
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'empleados',
});

export default Empleado;