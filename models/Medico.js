import mongoose from "mongoose";

const medicoSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    apellido: {type: String, required:true},
    email: { type: String, required: true},
    especialidad: {type: mongoose.Schema.Types.ObjectId, ref: "Especialidad" , required: true},
    profile_pic: { type: String}
}, { timestamps: true})

export default mongoose.model("Medico", medicoSchema)