import express from 'express';
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';
import { CrearMedico, getMedicos, getMedicosById } from '../controllers/medicosController.js';

const router = express.Router()



router.get('/api/medicos', getMedicos)
router.get('/api/medicos/:id', getMedicosById)


router.post('/api/medicos' , protegerRuta, CrearMedico)

export default router