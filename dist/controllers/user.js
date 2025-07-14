"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.updateAvatar = exports.updateRol = exports.getUsers = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, rol_id, avatar } = req.body;
    const user = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email: email } } });
    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email}`
        });
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    try {
        user_1.User.create({
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
    }
    catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario ${name} ${lastname}`
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`
        });
    }
    //usaremos una clave secreta aleatoria generada por una pagina de internet
    const token = jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_KEY || "4GaM[3s{8R}WF}D", {
        expiresIn: "10000"
    });
    res.json({
        token, user: {
            rol_id: user.rol_id,
            id: user.id
        }
    }); //hemos pasado tambien el rol para redireccionar luego si es profesor o alumno y el id del usuario
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.User.findAll();
    res.json(listUsers); // Devuelve directamente el array sin ninguna clave extra
});
exports.getUsers = getUsers;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newRol, email, degree } = req.body;
    try {
        // Buscar el usuario por email
        const user = yield user_1.User.findOne({ where: { email: email } });
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
        yield user.save();
        // Responder con éxito
        res.json({
            msg: `Rol de usuario con email ${email} actualizado a ${newRol}`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el rol del usuario'
        });
    }
});
exports.updateRol = updateRol;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { archivo, id_user } = req.body; // archivo es Base64
    try {
        // Buscar el usuario
        const user = yield user_1.User.findOne({ where: { id: id_user } });
        if (!user) {
            return res.status(400).json({ msg: `Usuario con ID ${id_user} no encontrado` });
        }
        // Guardar la imagen en la base de datos
        user.avatar = archivo;
        yield user.save();
        res.json({ msg: 'Avatar actualizado correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar el avatar' });
    }
});
exports.updateAvatar = updateAvatar;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield user_1.User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ msg: `Usuario con email ${email} no encontrado` });
        }
        // Generar token JWT de recuperació
        const token = jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_KEY || "4GaM[3s{8R}WF}D", {
            expiresIn: "1h"
        });
        // URL de recuperación (frontend)
        const resetLink = `https://usal-educaquest.onrender.com/reset-password?token=${token}`;
        // Configurar transportador
        const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail(mailOptions);
        return res.json({
            msg: `Se ha enviado un enlace de recuperación al correo ${email}`
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al procesar la recuperación de contraseña'
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, token } = req.body;
    try {
        // Verificar token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'claveFallback');
        const email = decoded.email;
        // Buscar el usuario por email
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Verificar que el token coincida y no haya expirado
        /*if (user.resetToken !== token || new Date() > new Date(user.resetTokenExpires)) {
            return res.status(401).json({ msg: 'Token inválido o expirado' });
        }*/
        console.log(password);
        // Hashear contraseñaF
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Actualizar la contraseña
        user.password = hashedPassword;
        // Guardar el usuario actualizado
        yield user.save();
        return res.json({ msg: 'Contraseña actualizada correctamente' });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ msg: 'Token inválido o malformado' });
    }
});
exports.resetPassword = resetPassword;
