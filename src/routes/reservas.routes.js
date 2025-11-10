import { Router } from 'express';
import * as reservasController from '../controllers/reservas.controller.js';


const router = Router();


// CRUD
router.post('/', reservasController.crearReserva); // POST /api/reservas
router.get('/', reservasController.obtenerReservas); // GET /api/reservas (+ filtros por query)
router.get('/:id', reservasController.obtenerReservaPorId); // GET /api/reservas/:id
router.put('/:id', reservasController.actualizarReservaPorId); // PUT /api/reservas/:id
router.delete('/:id', reservasController.eliminarReservaPorId); // DELETE /api/reservas/:id
router.get('?hotel=hotelid', reservasController.obtenerReservasPorHotel); // GET /api/reservas?hotel=hotelId
router.get('?fecha_inicio=FECHA_INICIO&fecha_fin=FECHA_FIN', reservasController.obtenerReservasPorFechas);   // GET /api/reservas?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
router.get('?tipo_habitacion=TIPO_HABITACION', reservasController.obtenerReservasPorHabitacion); // GET /api/reservas?tipo_habitacion=TIPO_HABITACION
router.get('?estado=ESTADO', reservasController.obtenerReservasPorEstado); // GET /api/reservas?estado=ESTADO
router.get('?num_huespedes=NUM_HUESPEDES', reservasController.obtenerReservasPorNumHuespedes); // GET /api/reservas?num_huespedes=NUM_HUESPEDES



export default router;