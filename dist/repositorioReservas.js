"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reserva_1 = __importDefault(require("./reserva"));
class RepositorioReservas {
    reservas;
    historialReservas;
    siguienteId = 1;
    constructor() {
        this.reservas = new Map;
        this.historialReservas = new Map;
    }
    agregarReserva(cliente, vehiculo, fechaInicio, fechaFin, temporada) {
        const nuevaReserva = new reserva_1.default(this.siguienteId, cliente, vehiculo, fechaInicio, fechaFin, temporada);
        this.reservas.set(nuevaReserva.getId(), nuevaReserva);
        this.historialReservas.set(nuevaReserva.getId(), nuevaReserva);
        this.siguienteId++;
    }
    eliminarReserva(reserva) {
        const eliminado = this.reservas.delete(reserva.getId());
        if (!eliminado) {
            throw new Error("reserva no encontrada");
        }
    }
    obtenerReservaPorId(id) {
        return this.reservas.get(id);
    }
    obtenerReservasEnConflicto(fechaInicio, fechaFin) {
        const conflictos = [];
        for (const reserva of this.reservas.values()) {
            if (fechaInicio < reserva.getFechaFin() && fechaFin > reserva.getFechaInicio()) {
                conflictos.push(reserva);
            }
        }
        return conflictos;
    }
    obtenerReservasPorPeriodo(fechaInicio, fechaFin) {
        const reservasDentroDelPeriodo = [];
        for (const reserva of this.historialReservas.values()) {
            if (fechaInicio <= reserva.getFechaFin() && fechaFin >= reserva.getFechaInicio()) {
                reservasDentroDelPeriodo.push(reserva);
            }
        }
        return reservasDentroDelPeriodo;
    }
    obtenerTodas() {
        return Array.from(this.reservas.values());
    }
}
exports.default = RepositorioReservas;
//# sourceMappingURL=repositorioReservas.js.map