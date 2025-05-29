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
exports.getTypesActivity = void 0;
const type_activity_1 = require("../models/type_activity");
const getTypesActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTypesActivity = yield type_activity_1.Type_activity.findAll();
    res.json(listTypesActivity); // Devuelve directamente el array sin ninguna clave extra
});
exports.getTypesActivity = getTypesActivity;
