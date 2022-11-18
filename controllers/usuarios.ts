import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.status(200).json({
        ok: true,
        msg: 'Todos los usuarios',
        usuarios,
    });
};

export const getUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.status(200).json({
            ok: true,
            msg: 'Usuario encontrado',
            usuario,
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: `No existe un usuario con el id ${id}`,
        });
    }
};

export const postUsuario = async (req: Request, res: Response) => {
    const {nombre, email, estado, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({
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
        const usuario = new Usuario({nombre, email, estado, password});

        // Encriptar contraseña
        
        const salt = bcryptjs.genSaltSync(11);
        // @ts-ignore
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario || Hable con el administrador'
        });
    }
};

export const putUsuario = async (req: Request, res: Response) => {

    const {id} = req.params;
    const {body} = req;


    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con el id: ' + id,
            });
        }

        await usuario.update(body);

        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario || Hable con el administrador'
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario con el id: ' + id,
        });
    }

    await usuario.update(
        {
            estado: false,
        }
    );


    res.status(200).json({
        ok: true,
        msg: 'usuario Desactivado',
        usuario
    });
};

