import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    apellido: {type: String, required:true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    telefono: {type: Number, required: true},
    turnos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Turno"}],
    admin: {type: Boolean, required: true},
    profile_pic: { type: String}
}, { timestamps: true})

export default mongoose.model("Usuario", usuarioSchema)