"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reserva {
    id;
    cliente;
    vehiculo;
    fechaInicio;
    fechaFin;
    temporada;
    constructor(id, cliente, vehiculo, fechaInicio, fechaFin, temporada) {
        this.id = id;
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.temporada = temporada;
    }
    getId() {
        return this.id;
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
    getTemporada() {
        return this.temporada;
    }
}
exports.default = Reserva;
//# sourceMappingURL=reserva.js.map