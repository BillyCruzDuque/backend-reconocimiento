import express, {Application} from 'express';

import cors from 'cors';

import userRoutes from '../routes/usuario';
import empleadoRoutes from '../routes/empleado';
import registroRoutes from '../routes/registro';

import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios',
        empleados: '/api/empleados',
        registros: '/api/registros',
    }

    constructor() {
        this.app = express();
        this.port = '3000';


        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Connection to DB successful');
        }catch(error) {

            console.log('Error connecting to DB', error);

            // @ts-ignore
            throw new Error(error);
        }
    }

    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPath.usuarios, userRoutes);
        this.app.use(this.apiPath.empleados, empleadoRoutes);
        this.app.use(this.apiPath.registros, registroRoutes);

    }


    listen() {
        this.app.listen(this.port, () => {
                console.log('Server running on port', this.port);
            }
        );
    }
}

export default Server;