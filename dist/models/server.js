"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("../routes/user"));
const activity_1 = __importDefault(require("../routes/activity"));
const process_1 = __importDefault(require("../routes/process"));
const type_activity_1 = __importDefault(require("../routes/type_activity"));
const subject_1 = __importDefault(require("../routes/subject"));
const child_1 = __importDefault(require("../routes/child"));
const user_2 = require("./user");
const activity_2 = require("./activity");
const process_2 = require("./process");
const type_activity_2 = require("./type_activity");
const subjects_1 = require("./subjects");
const subjects_for_teacher_1 = require("./subjects_for_teacher");
const rol_1 = require("./rol");
const children_1 = require("./children");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3017';
        this.middlewares(); // Primero middlewares
        this.router(); // Luego rutas API
        this.spaRouting(); // Luego catch-all para Angular
        this.listen(); // Luego arranca el servidor
        this.DBconnect(); // Finalmente conecta BBDD
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("El servidor está en el puerto: " + this.port);
        });
    }
    router() {
        this.app.use(user_1.default);
        this.app.use(activity_1.default);
        this.app.use(process_1.default);
        this.app.use(type_activity_1.default);
        this.app.use(subject_1.default);
        this.app.use(child_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        // Servir archivos estáticos del frontend Angular
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    }
    spaRouting() {
        // Redirigir cualquier otra ruta a index.html de Angular
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
        });
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await sequelize.authenticate();
                yield user_2.User.sync();
                yield activity_2.Activity.sync();
                yield process_2.Process.sync();
                yield type_activity_2.Type_activity.sync();
                yield subjects_1.Subjects.sync();
                yield subjects_for_teacher_1.Subjects_for_teacher.sync();
                yield rol_1.Rol.sync();
                yield children_1.Children.sync();
                console.log("Conexión Exitosa");
            }
            catch (error) {
                console.log("Error en la conexión a la base de datos, " + error);
            }
        });
    }
}
exports.default = Server;
