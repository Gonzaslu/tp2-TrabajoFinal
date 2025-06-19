import express from 'express';
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';
import { CrearEspecialidad, getEspecialidadById, getEspecialidades } from '../controllers/especialidadesController.js';

const router = express.Router()



router.get('/api/especialidades', getEspecialidades)
router.get('/api/especialidades/:id', getEspecialidadById)


router.post('/api/especialidades' , protegerRuta, CrearEspecialidad)

export default router