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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildren = void 0;
const children_1 = require("../models/children");
const getChildren = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listChildren = yield children_1.Children.findAll();
    res.json(listChildren); // Devuelve directamente el array sin ninguna clave extra
});
exports.getChildren = getChildren;
