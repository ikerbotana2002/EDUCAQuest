import { Request, Response } from "express";
import { Children } from '../models/children';


export const getChildren = async (req: Request, res: Response) => {
    const listChildren = await Children.findAll();
    res.json(listChildren); // Devuelve directamente el array sin ninguna clave extra
}
