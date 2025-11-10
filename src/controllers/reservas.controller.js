import * as service from '../services/reservas.service.js';
import { BadRequestError, NotFoundError } from '../utils/http-errors.js';
import { asyncHandler } from '../utils/async-handler.js';
import { validateCrear, validateActualizar, parseEntero } from '../utils/validators.js';

/*Create (POST)*/
export const crearReserva = asyncHandler(async (req, res) => {
  const { value, error } = validateCrear(req.body);
  if (error) throw new BadRequestError(error);
  const nueva = await service.crear(value);
  res.status(201).json({ ok: true, data: nueva });
});

/*Read (GET)*/
export const obtenerReservas = asyncHandler(async (req, res) => {

});

export const obtenerReservaPorId = asyncHandler(async (req, res) => {
  const id = parseEntero(req.params.id);
  const reserva = await service.obtenerPorId(id);
  if (!reserva) throw new NotFoundError('Reserva no encontrada');
  res.json({ ok: true, data: reserva });
});

export const obtenerReservasPorHotel = asyncHandler(async (req, res) => {

});

export const obtenerReservasPorFechas = asyncHandler(async (req, res) => {

});

export const obtenerReservasPorHabitacion = asyncHandler(async (req, res) => {

});


export const obtenerReservasPorEstado = asyncHandler(async (req, res) => {

});

export const  obtenerReservasPorNumHuespedes = asyncHandler(async (req, res) => {

});

/*Update (PUT)*/
export const actualizarReservaPorId = asyncHandler(async (req, res) => {


});

/*Delete (DELETE)*/
export const eliminarReservaPorId = asyncHandler(async (req, res) => {

});




// Aplica lo mismo en actualizar/eliminar/listar
