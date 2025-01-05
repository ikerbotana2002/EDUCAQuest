import { Request, Response } from "express";
import { Process } from "../models/process";

export const register = async (req: Request, res: Response) => {
    const { id_activity, id_user, result } = req.body;

    Process.create({
        id_activity: id_activity,
        id_user: id_user,
        result: result,
        status: 1,
    });

    res.json({
        msg: `Process create success...`
    });
};

export const getProcesses = async (req: Request, res: Response) => {
    const listProcesses = await Process.findAll();
    res.json(listProcesses); // Devuelve directamente el array sin ninguna clave extra
};