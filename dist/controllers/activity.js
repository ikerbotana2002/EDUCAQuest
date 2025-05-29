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
exports.updateActivity = exports.getActivities = exports.registerActivity = void 0;
const activity_1 = require("../models/activity");
const registerActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, id_subject, type, available, deadline, photo, num_fields, result } = req.body;
    const activity = yield activity_1.Activity.findOne({ where: { name: name } });
    if (activity) {
        return res.status(400).json({
            msg: `Actividad ya existe con el nombre ${name}`
        });
    }
    try {
        activity_1.Activity.create({
            name: name,
            description: description,
            id_subject: id_subject,
            type: type,
            available: available,
            deadline: deadline,
            photo: photo,
            num_fields: num_fields,
            result: result,
            status: 1,
        });
        res.json({
            msg: `Activity ${name} create success...`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear la actividad ${name}`
        });
    }
});
exports.registerActivity = registerActivity;
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listActivities = yield activity_1.Activity.findAll();
    res.json(listActivities); // Devuelve directamente el array sin ninguna clave extra
});
exports.getActivities = getActivities;
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { activityName, activityAvailable } = req.body;
    try {
        // Buscar la actividad por id
        const activity = yield activity_1.Activity.findOne({ where: { name: activityName } });
        // Si el proceso no existe
        if (!activity) {
            return res.status(400).json({
                msg: `Proceso no existe ${activity}`
            });
        }
        // Actualizar el feedback
        activity.available = activityAvailable;
        // Guardar los cambios en la base de datos
        yield activity.save();
        // Responder con éxito
        res.json({
            msg: `Disponibilidad de la actividad actualizada con éxito`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la disponibilidad de la actividad'
        });
    }
});
exports.updateActivity = updateActivity;
