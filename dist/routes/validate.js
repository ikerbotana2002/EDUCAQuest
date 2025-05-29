"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headersToken = req.headers['authorization'];
    if (headersToken != undefined && headersToken.startsWith("Bearer ")) {
        try {
            const token = headersToken.slice(7); //quitar la palabra "Bearer"
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || "4GaM[3s{8R}WF}D");
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: "Token invalido"
            });
        }
    }
    else {
        res.status(401).json({
            msg: "Acceso no autorizado"
        });
    }
};
exports.default = validateToken;
