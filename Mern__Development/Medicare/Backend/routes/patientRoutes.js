const express = require("express")
const router = express.Router()
const {
    getPatient,
    getPatientById,
    addPatient,
    deletPatient,
    updatePatient
} = require("../controller/patientController");

const auth = require("../middleware/authMiddleware")
const admin= require("../middleware/adminMiddleware")

router.get("/" , getPatient)
router.get("/:id" , getPatientById)
router.post("/", auth  , admin  ,addPatient)
router.delete("/:id",  auth , admin   ,deletPatient)
router.put("/:id" , auth , admin , updatePatient)
module.exports = router