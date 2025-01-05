
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<any> => {
    const { name, lastname, password, email, rol_id, credential } = req.body;

    const user = await User.findOne({ where: { [Op.or]: { email: email, credential: credential } } });

    

    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email} o credencial ${credential}`
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);


    try {
        User.create({
            name: name,
            lastname: lastname,
            email: email,
            rol_id: rol_id,
            password: passwordHash,
            credential: credential,
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

    const user:any = await User.findOne({ where: { email: email } });


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

    const token = jwt.sign({email: email}, 
        process.env.SECRET_KEY || "4GaM[3s{8R}WF}D", 
        {expiresIn: "10000"
    }); 
    

    res.json({token, user: {
        rol_id: user.rol_id,
        id: user.id
    }}); //hemos pasado tambien el rol para redireccionar luego si es profesor o alumno y el id del usuario
};
/*
export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();

    res.json({
        listUsers
    });
    
};*/
export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();
    res.json(listUsers); // Devuelve directamente el array sin ninguna clave extra
};



