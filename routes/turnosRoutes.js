import express from 'express';
import { CrearTurno, getTurnos, getTurnosById , getTurnosByUsuario, getTurnosByMedico} from '../controllers/turnosController.js'
import { protegerRuta } from '../middlewares/authMiddlewares.js';
import { allowUpload } from '../middlewares/uploadMiddleware.js';

const router = express.Router()



router.get('/api/turnos', getTurnos)
router.get('/api/turnos/:id', getTurnosById)
router.get('/api/turnosByUsuario/:id', getTurnosByUsuario)
router.get('/api/turnosByMedico/:id', getTurnosByMedico)



router.post('/api/turnos' , protegerRuta, CrearTurno)

export default router