"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reserva {
    cliente;
    vehiculo;
    fechaInicio;
    fechaFin;
    constructor(cliente, vehiculo, fechaInicio, fechaFin) {
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
    getFechaInicio() {
        return this.fechaInicio;
    }
    getFechaFin() {
        return this.fechaFin;
    }
    getVehiculo() {
        return this.vehiculo;
    }
    getCliente() {
        return this.cliente;
    }
}
exports.default = Reserva;
//# sourceMappingURL=reserva.js.map