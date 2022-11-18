import { Request, Response } from 'express';
import Registro from '../models/registro';
import db from '../db/connection';


export const getRegistros = async (req: Request, res: Response) => {

    const registro = await Registro.findAll();

    res.status(200).json({
        ok: true,
        msg: 'Todos los Registros',
        registro,
    });
};

export const getRegistro = async (req: Request, res: Response) => {
    const {id} = req.params;

    const registro = await Registro.findByPk(id);

    if (registro) {
        res.status(200).json({
            ok: true,
            msg: 'Registro encontrado',
            registro,
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: `No existe un registro con el id ${id}`,
        });
    }
};

export const postRegistro = async (req: Request, res: Response) => {
    const {id_empleado, fecha, hora_entrada} = req.body;

    try {

        const existeRegistro = await db.query(
            `SELECT * FROM registros WHERE id_empleado = ${id_empleado} AND fecha = '${fecha}'`,
            
        )

        if (existeRegistro[0].length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El registro ya existe!!!!',
            });
        }
        

        // @ts-ignore
        const registro = new Registro({id_empleado, fecha, hora_entrada});

        await registro.save();

        res.status(201).json({
            ok: true,
            msg: 'Registro creado',
            registro,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear registro || Hable con el administrador'
        });
    }
};


