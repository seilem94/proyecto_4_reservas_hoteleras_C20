import { AppError, NotFoundError, InternalServerError } from './http-errors.js';

export function notFound(req, res, next) {
  next(
    new NotFoundError(`Ruta ${req.method} ${req.originalUrl} no encontrada`)
  );
}

export function errorHandler(err, _req, res, _next) {
  //Guard Conditional: Si el error no es una instancia de AppError
  if (!(err instanceof AppError)) {
    console.error(err); // Log real del error desconocido
    return res.status(500).json({
      ok: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: err?.message || 'Error interno del servidor',
        details: null,
      },
    });
  }

  // Si llegamos aquí, err es AppError
  if (err.status >= 500) console.error(err);

  res.status(err.status).json({
    ok: false,
    error: {
      code: err.code,
      message: err.message,
      details: err.details ?? null,
    },
  });
}
