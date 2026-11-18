const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: String,
    fname: String,
    phone: Number,
    email: String,
    address: String,
    diseas: String,
    bill: Number,
    admitd: Date,
    discharged: Date,
    dctrnm: String,
    tdues: Number
});

module.exports = mongoose.model("Patient", patientSchema);