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
exports.addSubjectsForTeachers = exports.getSubjectsForTeachers = void 0;
const subjects_for_teachers_1 = require("../models/subjects_for_teachers");
const user_1 = require("../models/user");
const getSubjectsForTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSubjectsForTeachers = yield subjects_for_teachers_1.SubjectsForTeachers.findAll();
    res.json(listSubjectsForTeachers); // Devuelve directamente el array sin ninguna clave extra
});
exports.getSubjectsForTeachers = getSubjectsForTeachers;
const addSubjectsForTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { selectedSubjects, email } = req.body;
    try {
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        if (user.get('rol_id') != 2) {
            // Opcional: devolver 403 Forbidden o simplemente un json vacío
            return res.status(403).json({ msg: 'No autorizado: solo profesores pueden añadir asignaturas' });
        }
        const teacherId = user.get('id');
        // 1. Eliminar todas las asignaciones anteriores del profesor
        yield subjects_for_teachers_1.SubjectsForTeachers.destroy({
            where: { id_teacher: teacherId }
        });
        // 2. Crear nuevas asignaciones
        const results = [];
        for (const subject of selectedSubjects) {
            const subjectId = typeof subject === 'object' ? subject.id : subject;
            if (isNaN(subjectId)) {
                console.warn(`ID no válido:`, subject);
                continue;
            }
            const newEntry = yield subjects_for_teachers_1.SubjectsForTeachers.create({
                id_teacher: teacherId,
                id_subject: subjectId
            });
            results.push(newEntry);
        }
        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al añadir las asignaturas para el profesor',
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.addSubjectsForTeachers = addSubjectsForTeachers;
