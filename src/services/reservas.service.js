import { toDate } from '../utils/validators.js';

const reservas = [];
let nextId = 1;

export async function crear(data) {
  const nueva = { id: nextId++, ...data };
  reservas.push(nueva);
  return nueva;
}

export async function listar(filtros = {}) {
  let out = [...reservas];

  if (filtros.hotel) {
    const h = String(filtros.hotel).toLowerCase();
    out = out.filter((r) => r.hotel.toLowerCase() === h);
  }

  if (filtros.tipo_habitacion) {
    const t = String(filtros.tipo_habitacion).toLowerCase();
    out = out.filter((r) => r.tipo_habitacion.toLowerCase() === t);
  }

  if (filtros.estado) {
    const e = String(filtros.estado).toLowerCase();
    out = out.filter((r) => r.estado.toLowerCase() === e);
  }

  if (Number.isInteger(filtros.num_huespedes)) {
    out = out.filter((r) => r.num_huespedes === filtros.num_huespedes);
  }

  const fi = filtros.fecha_inicio ? toDate(filtros.fecha_inicio) : null;
  const ff = filtros.fecha_fin ? toDate(filtros.fecha_fin) : null;

  if (fi || ff) {
    out = out.filter((r) => {
      const rIni = toDate(r.fecha_inicio);
      const rFin = toDate(r.fecha_fin);
      // si no hay uno de los extremos del filtro, asumimos -∞/+∞
      const inicio = fi ?? new Date(-8640000000000000); // mínimo Date
      const fin    = ff ?? new Date( 8640000000000000); // máximo Date
      // superposición de [rIni, rFin] con [inicio, fin]
      return rIni <= fin && rFin >= inicio;
    });
  }
  return out;
}

export async function obtenerPorId(id) {
  return reservas.find((r) => r.id === id) || null;
}

export async function actualizar(id, cambios) {
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reservas[idx] = { ...reservas[idx], ...cambios };
  return reservas[idx];
}

export async function eliminar(id) {
  const idx = reservas.findIndex((r) => r.id === id);
  if (idx === -1) return false;
  reservas.splice(idx, 1);
  return true;
}
