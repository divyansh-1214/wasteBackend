const express = require('express')
const router = express.Router();
const routes = require("../controllers/modulesController")
router.post("/register", routes.register);
router.post("/update", routes.Update);
router.get("/get/:id", routes.getById);

module.exports = router