import { Request, Response } from 'express';
import Empleado from '../models/empleado';


export const getEmpleados = async (req: Request, res: Response) => {

    const empleado = await Empleado.findAll();

    res.status(200).json({
        ok: true,
        msg: 'Todos los empleado',
        empleado,
    });
};

export const getEmpleado = async (req: Request, res: Response) => {
    const {id} = req.params;

    const empleado = await Empleado.findByPk(id);

    if (empleado) {
        res.status(200).json({
            ok: true,
            msg: 'Empleado encontrado',
            empleado,
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: `No existe un empleado con el id ${id}`,
        });
    }
};

export const postEmpleado = async (req: Request, res: Response) => {
    const {nombre, apellido, puesto, telefono, direccion} = req.body;

    try {

        const existeEmpleado = await Empleado.findOne({
            where: {
                nombre: nombre,
            }
        });

        if (existeEmpleado) {
            return res.status(400).json({
                ok: false,
                msg: 'El empleado ya existe: ' + nombre,
            });
        }

        // @ts-ignore
        const empleado = new Empleado({nombre, apellido, puesto, telefono, direccion});

        await empleado.save();

        res.status(201).json({
            ok: true,
            msg: 'Empleado creado',
            empleado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear empleado || Hable con el administrador'
        });
    }
};

export const putEmpleado = async (req: Request, res: Response) => {

    const {id} = req.params;
    const {body} = req;


    try {

        const empleado = await Empleado.findByPk(id);

        if (!empleado) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con el id: ' + id,
            });
        }

        await empleado.update(body);

        res.status(200).json({
            ok: true,
            msg: 'Empleado actualizado',
            empleado,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear empleado || Hable con el administrador'
        });
    }
};

export const deleteEmpleado = async (req: Request, res: Response) => {
    const {id} = req.params;

    const empleado = await Empleado.findByPk(id);

    if (!empleado) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un empleado con el id: ' + id,
        });
    }

    await empleado.update(
        {
            estado: false,
        }
    );


    res.status(200).json({
        ok: true,
        msg: 'Empleado Desactivado',
        empleado
    });
};

