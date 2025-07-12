
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";


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
            degree: 0,
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
    const { newRol, email, degree } = req.body;

    try {
        // Buscar el usuario por email
        const user: any = await User.findOne({ where: { email: email } });

        // Si el usuario no existe
        if (!user) {
            return res.status(400).json({
                msg: `Usuario no existe con el email ${email}`
            });
        }

        if (newRol) {
            user.rol_id = newRol; // Asignar el nuevo rol
        }

        if (degree) {
            user.degree = degree; // Actualizar el grado
        }

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


export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
    const { email } = req.body;

    try {
        const user: any = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(400).json({ msg: `Usuario con email ${email} no encontrado` });
        }

        // Generar token JWT de recuperación
        const token = jwt.sign({ email: email },
            process.env.SECRET_KEY || "4GaM[3s{8R}WF}D",
            {
                expiresIn: "1h"
            });

        // URL de recuperación (frontend)
        const resetLink = `http://localhost:4200/reset-password?token=${token}`; // cámbialo a tu URL real

        // Configurar transportador
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL_USER || 'ikerzahara@gmail.com',
                pass: process.env.MAIL_PASS || 'vtvsrrgopnurjwon'
            }
        });

        // Opciones del correo
        const mailOptions = {
            from: '"Recuperación de contraseña" <ikerbotana@gmail.com>',
            to: email,
            subject: 'Restablecer contraseña',
            html: `
        <p>Hola ${user.name},</p>
        <p>Has solicitado restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        return res.json({
            msg: `Se ha enviado un enlace de recuperación al correo ${email}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la recuperación de contraseña'
        });
    }
};


export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    const { password, token } = req.body;

    try {
        // Verificar token
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY || 'claveFallback');
        const email = decoded.email;


        // Buscar el usuario por email
        const user: any = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Verificar que el token coincida y no haya expirado
        /*if (user.resetToken !== token || new Date() > new Date(user.resetTokenExpires)) {
            return res.status(401).json({ msg: 'Token inválido o expirado' });
        }*/
        console.log(password);

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar la contraseña
        user.password = hashedPassword;

        // Guardar el usuario actualizado
        await user.save();

        return res.json({ msg: 'Contraseña actualizada correctamente' });

    } catch (error: any) {
        console.error(error);
        return res.status(400).json({ msg: 'Token inválido o malformado' });
    }
};