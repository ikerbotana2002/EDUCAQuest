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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFeedback = exports.getProcesses = exports.registerHomeActivityProcess = exports.register = void 0;
const sequelize_1 = require("sequelize");
const process_1 = require("../models/process");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_activity, id_user, result } = req.body;
    const process = yield process_1.Process.findOne({
        where: { id_user: id_user, id_activity: id_activity }
    });
    // Si el proceso ya existe
    if (process) {
        return res.status(400).json({
            msg: `Proceso ya existe ${process}`
        });
    }
    process_1.Process.create({
        id_activity: id_activity,
        id_user: id_user,
        feedback: 0,
        result: result,
        status: 1,
    });
    res.json({
        msg: `Process create success...`
    });
});
exports.register = register;
const registerHomeActivityProcess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_activity, id_user, feedback, additionalComment } = req.body;
    const process = yield process_1.Process.findOne({
        where: { id_user: id_user, id_activity: id_activity }
    });
    // Si el proceso ya existe
    if (process) {
        return res.status(400).json({
            msg: `Proceso ya existe ${process}`
        });
    }
    process_1.Process.create({
        id_activity: id_activity,
        id_user: id_user,
        result: "",
        feedback: feedback,
        additionalComment: additionalComment,
        status: 1,
    });
    res.json({
        msg: `Process create success...`
    });
});
exports.registerHomeActivityProcess = registerHomeActivityProcess;
const getProcesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProcesses = yield process_1.Process.findAll();
    res.json(listProcesses); // Devuelve directamente el array sin ninguna clave extra
});
exports.getProcesses = getProcesses;
const updateFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { feedback, id_user, id_activity, additionalComment } = req.body;
    try {
        // Buscar el proceso por idUser
        //const process: any = await Process.findOne({ where: { id_user: id_user } });
        console.log('id_user', id_user);
        console.log('id_activity', id_activity);
        const process = yield process_1.Process.findOne({ where: { [sequelize_1.Op.and]: { id_user: id_user, id_activity: id_activity } } });
        // Si el proceso no existe
        if (!process) {
            return res.status(400).json({
                msg: `Proceso no existe ${process}`
            });
        }
        // Actualizar el feedback
        process.feedback = feedback;
        process.additionalComment = additionalComment;
        // Guardar los cambios en la base de datos
        yield process.save();
        // Responder con éxito
        res.json({
            msg: `Feedback actualizado con éxito`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el feedback'
        });
    }
});
exports.updateFeedback = updateFeedback;
