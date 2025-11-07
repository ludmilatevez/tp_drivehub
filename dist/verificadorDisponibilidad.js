"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerificadorDisponibilidad {
    repositorioVehiculos;
    repositorioReservas;
    constructor(repositorioVehiculos, repositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }
    estaDisponible(vehiculo, fechainicio, fechaFin) {
        const autoEstaDisponible = this.verificarAutoDisponible(vehiculo);
        if (!autoEstaDisponible) {
            return false;
        }
        const reservasConflicto = this.repositorioReservas.obtenerReservasEnConflicto(fechainicio, fechaFin);
        for (const reservaConflicto of reservasConflicto) {
            if (reservaConflicto.getVehiculo().getNumeroMatricula() === vehiculo.getNumeroMatricula()) {
                return false;
            }
        }
        return true;
    }
    verificarAutoDisponible(vehiculo) {
        const autoEncontrado = this.repositorioVehiculos.obtenerPorMatricula(vehiculo.getNumeroMatricula());
        return autoEncontrado !== undefined && autoEncontrado.estaDisponible();
    }
}
exports.default = VerificadorDisponibilidad;
//# sourceMappingURL=verificadorDisponibilidad.js.map