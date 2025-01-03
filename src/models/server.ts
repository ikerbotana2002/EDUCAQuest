import express, { Application } from 'express';
import sequelize from '../database/connection';
import RUser from '../routes/user';
import RProduct from '../routes/product';
import { User } from './user';
import { Product } from './product';
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
        this.app.use(RProduct);
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async DBconnect() {
        try {
            // await sequelize.authenticate();
            await User.sync(); // Se crea la tabla en la base de datos
            await Product.sync();
            console.log("Conexión Exitosa");
        } catch (error) {
            console.log("Error en la conexion a la base de datos, " + error);  
        }
    }
}

export default Server;

