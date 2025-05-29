"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const child_1 = require("../controllers/child");
const router = (0, express_1.Router)();
router.get("/api/child/getChildren", child_1.getChildren);
exports.default = router;
