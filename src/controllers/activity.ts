import { Request, Response } from "express";
import { Activity } from "../models/activity";


export const registerActivity = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    Activity.create({
        name: name,
        description: description,
        status: 1,
    });

    res.json({
        msg: `Activity ${name} create success...`
    });
};

export const getActivities = async (req: Request, res: Response) => {
    const listActivities = await Activity.findAll();
    res.json(listActivities); // Devuelve directamente el array sin ninguna clave extra
};
