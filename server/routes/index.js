const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const serviceRoutes = require("./serviceRoutes");

router.use("/auth", authRoutes);
router.use("/services", serviceRoutes);

module.exports = router;
