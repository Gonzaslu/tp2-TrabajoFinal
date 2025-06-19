import express from 'express';
import { CrearTurno, getTurnos, getTurnosById } from '../controllers/turnosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router()



router.get('/api/turnos', getTurnos)
router.get('/api/turnos/:id', getTurnosById)


router.post('/api/turnos' , protegerRuta, CrearTurno)

export default router