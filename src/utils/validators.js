export function isDateString(v) {
  return /^(\d{4})-(\d{2})-(\d{2})$/.test(String(v));
}
export function toDate(v) {
  return new Date(`${v}T00:00:00Z`);
}
export function parseEntero(v) {
  const n = Number.parseInt(v, 10);
  return Number.isNaN(n) ? undefined : n;
}

export function validateCrear(body) {
  // ✅ Guard: body debe existir y ser objeto
  if (!body || typeof body !== 'object') {
    return { error: 'Body JSON requerido' };
  }

  const required = [
    'hotel',
    'fecha_inicio',
    'fecha_fin',
    'tipo_habitacion',
    'estado',
    'num_huespedes',
    'nombre_huesped',
  ];

  for (const k of required) {
    if (body[k] === undefined || body[k] === null || body[k] === '') {
      return { error: `Campo requerido: ${k}` };
    }
  }

  if (!isDateString(body.fecha_inicio) || !isDateString(body.fecha_fin)) {
    return { error: 'Las fechas deben tener formato YYYY-MM-DD' };
  }
  const fi = toDate(body.fecha_inicio);
  const ff = toDate(body.fecha_fin);
  if (fi > ff)
    return { error: 'fecha_inicio no puede ser posterior a fecha_fin' };

  const num = Number(body.num_huespedes);
  if (!Number.isInteger(num) || num <= 0)
    return { error: 'num_huespedes debe ser un entero positivo' };

  const value = {
    hotel: String(body.hotel).trim(),
    fecha_inicio: body.fecha_inicio,
    fecha_fin: body.fecha_fin,
    tipo_habitacion: String(body.tipo_habitacion).trim(),
    estado: String(body.estado).trim(),
    num_huespedes: num,
    nombre_huesped: String(body.nombre_huesped).trim(),
  };
  return { value };
}

export function validateActualizar(body) {
  const value = {};
  if ('hotel' in body) value.hotel = String(body.hotel).trim();
  if ('fecha_inicio' in body) {
    if (!isDateString(body.fecha_inicio))
      return { error: 'fecha_inicio inválida' };
    value.fecha_inicio = body.fecha_inicio;
  }
  if ('fecha_fin' in body) {
    if (!isDateString(body.fecha_fin)) return { error: 'fecha_fin inválida' };
    value.fecha_fin = body.fecha_fin;
  }
  if (value.fecha_inicio && value.fecha_fin) {
    if (toDate(value.fecha_inicio) > toDate(value.fecha_fin))
      return { error: 'fecha_inicio no puede ser posterior a fecha_fin' };
  }
  if ('tipo_habitacion' in body)
    value.tipo_habitacion = String(body.tipo_habitacion).trim();
  if ('estado' in body) value.estado = String(body.estado).trim();
  if ('num_huespedes' in body) {
    const n = Number(body.num_huespedes);
    if (!Number.isInteger(n) || n <= 0)
      return { error: 'num_huespedes debe ser entero positivo' };
    value.num_huespedes = n;
  }
  if ('nombre_huesped' in body)
    value.nombre_huesped = String(body.nombre_huesped).trim();
  return { value };
}
