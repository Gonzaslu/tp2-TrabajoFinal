import express from 'express';
import {
    actualizarProfilePic,
    CrearUsuario,
    getUsuarios,
    getUsuariosById,
    home,
    login,
} from '../controllers/usuariosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router()

router.post('/api/login', login)

router.get('/', home)
router.get('/api/usuarios', getUsuarios)
router.get('/api/usuarios/:id', getUsuariosById)


router.post('/api/usuarios' , protegerRuta, CrearUsuario)
router.put('/api/usuarios/', protegerRuta, allowUpload.single('imagen'), actualizarProfilePic)

export default router