import Especialidad from "../models/Especialidad.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import supabase from "../config/supabase.js";


export const getEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.find()
        res.json(especialidades)
    } catch (error) {
        res.status(500).json({error: "Error al obtener especialidades"})
    }
}

export const getEspecialidadById = async (req, res) => {

    try {
        const especialidad = await Especialidad.findById(req.params.id)
        if(especialidad){
            res.json(especialidad)
        }else{
            res.status(404).json({ error: 'Especialidad no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const CrearEspecialidad = async (req, res) => {  

    // console.log("Req crear Usuario: ", 
    //     { reqUsuario: req.usuario,
    //       reqBody: req.body
    //     });
    


    const { nombre} = req.body;
    if(!nombre){
        return res.status(400).json({error: "Faltan datos"})
    }

    
    const especialidad = {
        nombre
    }

    try {
        const nuevaEspecialidad = await Especialidad.create(especialidad)
        res.status(201).json(nuevaEspecialidad)
    } catch (error) {
        res.status(500).json({error: "Error al crear Especialidad"})
    }
    
}