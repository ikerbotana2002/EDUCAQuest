"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = require("../controllers/activity");
const router = (0, express_1.Router)();
router.post("/api/activity/register", activity_1.registerActivity);
router.get("/api/activity/getActivities", activity_1.getActivities);
router.patch("/api/activity/update", activity_1.updateActivity);
exports.default = router;
