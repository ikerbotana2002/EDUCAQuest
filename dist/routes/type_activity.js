"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const type_activity_1 = require("../controllers/type_activity");
const router = (0, express_1.Router)();
router.get("/api/type_activity/getTypesActivity", type_activity_1.getTypesActivity);
exports.default = router;
