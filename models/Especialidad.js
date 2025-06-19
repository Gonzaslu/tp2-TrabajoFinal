import mongoose from "mongoose";

const espepcialidadSchema = mongoose.Schema({
    nombre: { type: String, required: true}
}, { timestamps: true})

export default mongoose.model("Especialidad", espepcialidadSchema)