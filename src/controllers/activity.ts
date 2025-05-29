import { Request, Response } from "express";
import { Activity } from "../models/activity";


export const registerActivity = async (req: Request, res: Response): Promise<any> => {

    const { name, description, id_subject, type, available, deadline, photo, num_fields, result } = req.body;
    
    const activity = await Activity.findOne({ where: { name: name } });

    if (activity) {
        return res.status(400).json({
            msg: `Actividad ya existe con el nombre ${name}`
        });
    }

    try {
        Activity.create({
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

    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear la actividad ${name}`
        });
    }
};

export const getActivities = async (req: Request, res: Response) => {
    const listActivities = await Activity.findAll();
    res.json(listActivities); // Devuelve directamente el array sin ninguna clave extra
};


export const updateActivity = async (req: Request, res: Response): Promise<any> => {
    const { activityName, activityAvailable } = req.body;

    try {
        // Buscar la actividad por id
        const activity: any = await Activity.findOne({ where: { name: activityName } });
        
        // Si el proceso no existe
        if (!activity) {
            return res.status(400).json({
                msg: `Proceso no existe ${activity}`
            });
        }

        // Actualizar el feedback
        activity.available = activityAvailable;

        // Guardar los cambios en la base de datos
        await activity.save();

        // Responder con éxito
        res.json({
            msg: `Disponibilidad de la actividad actualizada con éxito`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar la disponibilidad de la actividad'
        });
    }
}

