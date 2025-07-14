import { Request, Response } from "express";
import { SubjectsForTeachers } from '../models/subjects_for_teachers';
import { User } from "../models/user";
import { Subjects } from "../models/subjects";


export const getSubjectsForTeachers = async (req: Request, res: Response) => {
    const listSubjectsForTeachers = await SubjectsForTeachers.findAll();
    res.json(listSubjectsForTeachers); // Devuelve directamente el array sin ninguna clave extra
}

export const addSubjectsForTeachers = async (req: Request, res: Response): Promise<any> => {
    const { selectedSubjects, email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (user.get('rol_id') != 2) {
            // Opcional: devolver 403 Forbidden o simplemente un json vacío
            return res.status(403).json({ msg: 'No autorizado: solo profesores pueden añadir asignaturas' });
        }

        const teacherId = user.get('id');

        // 1. Eliminar todas las asignaciones anteriores del profesor
        await SubjectsForTeachers.destroy({
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

            const newEntry = await SubjectsForTeachers.create({
                id_teacher: teacherId,
                id_subject: subjectId
            });
            results.push(newEntry);
        }

        res.status(201).json(results);

    } catch (error) {
        res.status(500).json({
            msg: 'Error al añadir las asignaturas para el profesor',
            error: error instanceof Error ? error.message : error
        });
    }
}

