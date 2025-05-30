"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjects_for_teachers_1 = require("../controllers/subjects_for_teachers");
const router = (0, express_1.Router)();
router.get("/api/subjectsForTeachers/getSubjectsForTeachers", subjects_for_teachers_1.getSubjectsForTeachers);
router.post("/api/subjectsForTeachers/addSubjectsForTeachers", subjects_for_teachers_1.addSubjectsForTeachers);
exports.default = router;
