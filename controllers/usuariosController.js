import Usuario from "../models/Usuario.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import supabase from "../config/supabase.js";

export const home = (req, res) => {
    res.send(`<h1>Home de la API</h1>`)
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({ error: 'Faltan credenciales'})
        }
    
        try {
    
            const usuario = await Usuario.findOne({email});
    
            if(!usuario){
                return res.status(404).json({ error: 'Usuario no encontrado'})
            }
    
            const match = await bcrypt.compare(password, usuario.password)
    
            if(!match){
                return res.status(401).json({ error: 'Password incorrecta'})
            }
    
    
            // JWT.SIGN
            // Primer argumento, lo que vas a encriptar
            // Segundo argumento, la llave para encriptar / desencriptar
            // Tercer argumento, el tiempo que va a durar ese token
            const datosEncriptados = { id: usuario._id, email: usuario.email, rol: 'admin'}
            const JWT_KEY = process.env.JWT_SECRET
            const token = jwt.sign(
                datosEncriptados,
                JWT_KEY,
                { expiresIn: '1h'}
            )
    
            res.json({ accessToken: token})
            
        } catch (error) {
            res.status(500).json({error: 'Error al hacer login'})
        }

}

export const getUsuarios = async (req, res) => {
    console.log("hola");
    
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({error: "Error al obtener usuarios"})
    }
}

export const getUsuariosById = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.params.id)
        if(usuario){
            res.json(usuario)
        }else{
            res.status(404).json({ error: 'Usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const CrearUsuario = async (req, res) => {  

    console.log("Req crear Usuario: ", 
        { reqUsuario: req.usuario,
          reqBody: req.body
        });
    


    const { nombre, apellido, email, password, telefono, admin } = req.body;
    if(!nombre || !apellido || !email || !password || !telefono){
        return res.status(400).json({error: "Faltan datos"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const usuario = {
        nombre,
        apellido,
        email,
        password: hashedPassword,
        telefono,
        admin
    }

    try {
        const nuevoUsuario = await Usuario.create(usuario)
        res.status(201).json(nuevoUsuario)
    } catch (error) {
        res.status(500).json({error: "Error al crear Usuario"})
    }
    
}

export const actualizarProfilePic = async (req, res) => {
    const { usuario } = req;
    const file = req.file;
    
    if(!file){
        return res.status(400).json({ error: 'No se proporciono ninguna imagen'})
    }

    

    const fileName = `${Date.now()}_${file.originalname}`
    const filePath = `usuarios/${usuario.id}/profilePic/${fileName}`

    try {
        const { data, error } = await supabase.storage
                                .from(process.env.SUPABASE_BUCKET)
                                .upload(filePath, file.buffer, {
                                    contentType: file.mimetype,
                                    upsert: true
                                })

        if(error){
            return res.status(500).json({
                error: 'Error al subir la imagen a Supabase',
                errorMensaje: error
            })
        }

        const {data: publicUrlData } = supabase.storage.from(process.env.SUPABASE_BUCKET).getPublicUrl(filePath) 
        
        const profilePicUrl = publicUrlData.publicUrl;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            usuario.id,
            {profile_pic: profilePicUrl},
            {new: true}
        );

        res.json({
            msg: 'Imagen actualizada correctamente',
            alumno: usuarioActualizado
        })
        

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al actualizar la imagen'})
    }
}