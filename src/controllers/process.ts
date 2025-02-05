import { Request, Response } from "express";
import { Op } from "sequelize";
import { Process } from "../models/process";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { id_activity, id_user, result } = req.body;

    const process: any = await Process.findOne({ 
        where: { id_user: id_user, id_activity: id_activity } 
    });

    // Si el proceso ya existe
    if (process) {
        return res.status(400).json({
            msg: `Proceso ya existe ${process}`
        });
    }

    Process.create({
        id_activity: id_activity,
        id_user: id_user,
        feedback: "",
        result: result,
        status: 1,
    });

    res.json({
        msg: `Process create success...`
    });
};

export const registerHomeActivityProcess = async (req: Request, res: Response): Promise<any> => {
    const { id_activity, id_user, feedback, additionalComment } = req.body;

    const process: any = await Process.findOne({ 
        where: { id_user: id_user, id_activity: id_activity } 
    });


    // Si el proceso ya existe
    if (process) {
        return res.status(400).json({
            msg: `Proceso ya existe ${process}`
        });
    }

    Process.create({
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
};

export const getProcesses = async (req: Request, res: Response) => {
    const listProcesses = await Process.findAll();
    res.json(listProcesses); // Devuelve directamente el array sin ninguna clave extra
};

export const updateFeedback = async (req: Request, res: Response): Promise<any> => {
    const { feedback, id_user, id_activity, additionalComment } = req.body;

    try {
        // Buscar el proceso por idUser
        
        //const process: any = await Process.findOne({ where: { id_user: id_user } });
        console.log('id_user', id_user);
        console.log('id_activity', id_activity);
        const process: any = await Process.findOne({ where: { [Op.and]: { id_user: id_user, id_activity: id_activity } } });


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
        await process.save();

        // Responder con éxito
        res.json({
            msg: `Feedback actualizado con éxito`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el feedback'
        });
    }
}
