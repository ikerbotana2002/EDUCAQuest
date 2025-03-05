import { Request, Response } from "express";
import { Subjects } from '../models/subjects';


export const getSubjects = async (req: Request, res: Response) => {
    const listSubjects = await Subjects.findAll();
    res.json(listSubjects); // Devuelve directamente el array sin ninguna clave extra
}

