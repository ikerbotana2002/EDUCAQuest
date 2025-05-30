import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';

import sequelize from '../database/connection';
import RUser from '../routes/user';
import RActivity from '../routes/activity';
import RProcess from '../routes/process';
import RType_activity from '../routes/type_activity';
import RSubjects from '../routes/subject';
import RChildren from '../routes/child';
import RSubjectsForTeachers from '../routes/subjects_for_teachers';

import { User } from './user';
import { Activity } from './activity';
import { Process } from './process';
import { Type_activity } from './type_activity';
import { Subjects } from './subjects';
import { SubjectsForTeachers } from './subjects_for_teachers';
import { Rol } from './rol';
import { Children } from './children';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3017';
        this.middlewares();    // Primero middlewares
        this.router();         // Luego rutas API
        this.spaRouting();     // Luego catch-all para Angular
        this.listen();         // Luego arranca el servidor
        this.DBconnect();      // Finalmente conecta BBDD
    }

    private listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor está en el puerto: " + this.port);
        });
    }

    private router() {
        this.app.use(RUser);
        this.app.use(RActivity);
        this.app.use(RProcess);
        this.app.use(RType_activity);
        this.app.use(RSubjects);
        this.app.use(RChildren);
        this.app.use(RSubjectsForTeachers);
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());

        // Servir archivos estáticos del frontend Angular
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    private spaRouting() {
        // Redirigir cualquier otra ruta a index.html de Angular
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }

    private async DBconnect() {
        try {
            // await sequelize.authenticate();
            await User.sync();
            await Activity.sync();
            await Process.sync();
            await Type_activity.sync();
            await Subjects.sync();
            await Rol.sync();
            await Children.sync();
            await SubjectsForTeachers.sync();
            console.log("Conexión Exitosa");
        } catch (error) {
            console.log("Error en la conexión a la base de datos, " + error);
        }
    }
}

export default Server;
