"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_1 = require("../controllers/subject");
const router = (0, express_1.Router)();
router.get("/api/subject/getSubjects", subject_1.getSubjects);
exports.default = router;
