import express, { Application } from 'express';
import sequelize from '../database/connection';
import RUser from '../routes/user';
import RActivity from '../routes/activity';
import RProcess from '../routes/process';
import RType_activity from '../routes/type_activity';
import RSubjects from '../routes/subject';
import RChildren from '../routes/child';
import { User } from './user';
import { Activity } from './activity';
import { Process } from './process';
import { Type_activity } from './type_activity';
import { Subjects } from './subjects';
import { Subjects_for_teacher } from './subjects_for_teacher';
import { Rol } from './rol';
import { Children } from './children';

import cors from 'cors';

class Server {
    
    private app: Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3017';
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor esta en el puerto: " + this.port);
        });
    }

    router() {
        this.app.use(RUser);
        this.app.use(RActivity);
        this.app.use(RProcess);
        this.app.use(RType_activity);
        this.app.use(RSubjects);
        this.app.use(RChildren);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async DBconnect() {
        try {
            // await sequelize.authenticate();
            await User.sync(); // Se crea la tabla en la base de datos
            await Activity.sync();
            await Process.sync();
            await Type_activity.sync();
            await Subjects.sync();
            await Subjects_for_teacher.sync();
            await Rol.sync();
            await Children.sync();
            console.log("Conexión Exitosa");
        } catch (error) {
            console.log("Error en la conexion a la base de datos, " + error);  
        }
    }
}

export default Server;

