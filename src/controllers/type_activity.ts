import { Request, Response } from "express";
import { Type_activity } from '../models/type_activity';


export const getTypesActivity = async (req: Request, res: Response) => {
    const listTypesActivity = await Type_activity.findAll();
    res.json(listTypesActivity); // Devuelve directamente el array sin ninguna clave extra
}

