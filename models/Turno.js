import mongoose from "mongoose";

const turnoSchema = mongoose.Schema({
    fecha: { type: String, required: true},
    hora: {type: String, required:true},
    medico: { type: mongoose.Schema.Types.ObjectId, ref: "Medico", required: true},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
}, { timestamps: true})

export default mongoose.model("Turno", turnoSchema)