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
exports.getActivities = exports.registerActivity = void 0;
const activity_1 = require("../models/activity");
const registerActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    activity_1.Activity.create({
        name: name,
        description: description,
        status: 1,
    });
    res.json({
        msg: `Activity ${name} create success...`
    });
});
exports.registerActivity = registerActivity;
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listActivities = yield activity_1.Activity.findAll();
    res.json({
        listActivities
    });
});
exports.getActivities = getActivities;
