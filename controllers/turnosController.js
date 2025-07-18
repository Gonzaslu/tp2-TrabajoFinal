import Medico from "../models/Medico.js";
import Turno from "../models/Turno.js"
import Usuario from "../models/Usuario.js";


export const CrearTurno = async (req, res) => {  

    console.log("Req crear Usuario: ", 
        { usuario: req.usuario,
          reqBody: req.body
        });
    
        //traer usuarioId y medicoId, del req 


    const { fecha, hora, medico, usuario} = req.body;
    if(!fecha || !hora || !medico || !usuario){
        return res.status(400).json({error: "Faltan datos"})
    }

    
    const turno = {
        fecha,
        hora,
        medico,
        usuario
    }

    try {
        const nuevoTurno = await Turno.create(turno)
        await Usuario.findByIdAndUpdate(
            usuario.id ?? usuario,
            { $push: { turnos: nuevoTurno._id } }
        )
        await Medico.findByIdAndUpdate(
            medico.id ?? medico,
            { $push: {turnos: nuevoTurno._id}}
        )
        res.status(201).json(nuevoTurno)
    } catch (error) {
        res.status(500).json({error: "Error al crear Turno", err: error})
    }
    
}

export const getTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find()
        res.json(turnos)
    } catch (error) {
        res.status(500).json({error: "Error al obtener turnos"})
    }
}

export const getTurnosById = async (req, res) => {

    try {
        const turno = await Turno.findById(req.params.id)
        if(turno){
            res.json(turno)
        }else{
            res.status(404).json({ error: 'Turno no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const getTurnosByUsuario = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.params.id).populate("turnos")
        
        if(usuario && usuario.turnos.length > 0){
            res.json(usuario.turnos)
        }else{
            res.status(404).json({ error: 'Turno no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const getTurnosByMedico = async (req, res) => {

    try {
        const medico = await Medico.findById(req.params.id).populate("turnos")
        
        if(medico && medico.turnos.length > 0){
            res.json(medico.turnos)
        }else{
            res.status(404).json({ error: 'Turno no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}