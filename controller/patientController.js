const Patient = require("../models/patient")

const getPatient = async (req , res) => {
    try{
        const pat= await Patient.find();
        res.json(pat)
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({
            msg : " Error in get function"
        });
    }
}

const getPatientById = async (req , res) => {
    try{
        const pat= await Patient.findById(req.params.id);
        res.json(pat)
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({
            msg : " Error in get By Id function"
        });
    }
}

const addPatient = async (req , res) => {
    try{
         const {
            name,
            fname,
            phone,
            email,
            address,
            diseas,
            bill,
            admitd,
            discharged,
            dctrnm,
            tdues
        } = req.body;




        const pat = await Patient.create({
            name,
            fname,
            phone,
            email,
            address,
            diseas,
            bill,
            admitd,
            discharged,
            dctrnm,
            tdues
        });
        res.json(pat)
    }
    catch(err) {
        console.log(err);
        console.log("addPatient:", typeof addPatient);
        return res.status(400).json({
            msg : " Error in add function"
        });
    }
}

const deletPatient = async (req , res) => {
    try{
        const pat= await Patient.findByIdAndDelete(req.params.id);
        res.json(pat)
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({
            msg : " Error in delete function"
        });
    }
}

const updatePatient = async (req , res) => {
    try{
        const pat = await Patient.findByIdAndUpdate(req.params.id ,
        req.body , {new:true , runValidators:true});

        res.json(pat)
        console.log("Patient updated")
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = {
    getPatient,
    getPatientById,
    addPatient,
    deletPatient,
    updatePatient
}

