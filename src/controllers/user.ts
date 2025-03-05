
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, lastname, email, password, rol_id, avatar } = req.body;

    const user = await User.findOne({ where: { [Op.or]: { email: email } } });



    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email}`
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);


    try {
        User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            rol_id: rol_id,
            avatar: avatar,
            status: 1,
        });

        res.json({
            msg: `User ${name} ${lastname} create success...`
        });

    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario ${name} ${lastname}`
        });
    }




}

export const login = async (req: Request, res: Response): Promise<any> => {

    const { email, password } = req.body;

    const user: any = await User.findOne({ where: { email: email } });


    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        });
    }

    //usaremos una clave secreta aleatoria generada por una pagina de internet

    const token = jwt.sign({ email: email },
        process.env.SECRET_KEY || "4GaM[3s{8R}WF}D",
        {
            expiresIn: "10000"
        });


    res.json({
        token, user: {
            rol_id: user.rol_id,
            id: user.id
        }
    }); //hemos pasado tambien el rol para redireccionar luego si es profesor o alumno y el id del usuario
};


export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();
    res.json(listUsers); // Devuelve directamente el array sin ninguna clave extra
};


export const updateRol = async (req: Request, res: Response): Promise<any> => {
    const { newRol, email } = req.body;

    try {
        // Buscar el usuario por email
        const user: any = await User.findOne({ where: { email: email } });

        // Si el usuario no existe
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el email ${email}`
            });
        }

        // Actualizar el rol del usuario
        user.rol_id = newRol; // Asignar el nuevo rol

        // Guardar los cambios en la base de datos
        await user.save();

        // Responder con éxito
        res.json({
            msg: `Rol de usuario con email ${email} actualizado a ${newRol}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el rol del usuario'
        });
    }
};

export const updateAvatar = async (req: Request, res: Response): Promise<any> => {
    const { archivo, id_user } = req.body; // archivo es Base64

    try {
        // Buscar el usuario
        const user: any = await User.findOne({ where: { id: id_user } });

        if (!user) {
            return res.status(400).json({ msg: `Usuario con ID ${id_user} no encontrado` });
        }

        // Guardar la imagen en la base de datos
        user.avatar = archivo;
        await user.save();

        res.json({ msg: 'Avatar actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el avatar' });
    }
};





