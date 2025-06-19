import Medico from "../models/Medico.js"
import bcrypt from "bcryptjs";
import supabase from "../config/supabase.js";


export const getMedicos = async (req, res) => {
    try {
        const medicos = await Medico.find()
        res.json(medicos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener medicos"})
    }
}

export const getMedicosById = async (req, res) => {

    try {
        const medico = await Medico.findById(req.params.id)
        if(medico){
            res.json(medico)
        }else{
            res.status(404).json({ error: 'Medico no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const CrearMedico = async (req, res) => {  

    console.log("Req crear Usuario: ", 
        { reqUsuario: req.usuario,
          reqBody: req.body
        });
    


    const { nombre, apellido, email, especialidad} = req.body;
    if(!nombre || !apellido || !email || !especialidad){
        return res.status(400).json({error: "Faltan datos"})
    }

    
    const medico = {
        nombre,
        apellido,
        email,
        especialidad
    }

    try {
        const nuevoMedico = await Medico.create(medico)
        res.status(201).json(nuevoMedico)
    } catch (error) {
        res.status(500).json({error: "Error al crear Medico"})
    }
    
}