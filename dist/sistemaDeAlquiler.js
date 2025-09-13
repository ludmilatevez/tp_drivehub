"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reserva_1 = __importDefault(require("./reserva"));
class SistemaDeAlquiler {
    vehiculos;
    reservas;
    constructor() {
        this.vehiculos = new Array;
        this.reservas = new Array;
    }
    crearReserva(cliente, vehiculo, fechaInicio, fechaFin) {
        if (this.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            const reserva = new reserva_1.default(cliente, vehiculo, fechaInicio, fechaFin);
            this.reservas.push(reserva);
            vehiculo.setEstado("En alquiler");
        }
        else {
            throw new Error("el vehiculo solicitado no esta disponible");
        }
    }
    entregarVehiculo(reserva, kilometrajeDiario) {
        const vehiculo = reserva.getVehiculo();
        const cliente = reserva.getCliente();
        const fechaInicio = reserva.getFechaInicio();
        const fechaFin = reserva.getFechaFin();
        const diasReservados = this.calcularDuracionEnDias(fechaInicio, fechaFin);
        const costoFinal = vehiculo.calcularCostoFinal(kilometrajeDiario, diasReservados);
        vehiculo.setEstado("Disponible");
        this.eliminarReserva(reserva);
    }
    estaDisponible(vehiculo, fechaInicio, fechaFin) {
        let vehiculoEstaDisponible = this.verificarAutoDisponible(vehiculo);
        let horarioEstaDisponible = this.verificarHorarioDisponible(fechaInicio, fechaFin);
        return vehiculoEstaDisponible && horarioEstaDisponible;
    }
    verificarAutoDisponible(vehiculo) {
        for (let auto of this.vehiculos) {
            if (auto.getNumeroMatricula() == vehiculo.getNumeroMatricula() && auto.getEstado() == "Disponible") {
                return true;
            }
        }
        return false;
    }
    verificarHorarioDisponible(fechaInicio, fechaFin) {
        for (let reserva of this.reservas) {
            if (fechaInicio < reserva.getFechaFin() && fechaFin > reserva.getFechaInicio()) {
                return false;
            }
        }
        return true;
    }
    calcularDuracionEnDias(fechaInicio, fechaFin) {
        let diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
        let unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;
        return diferenciaEnMilisegundos / unDiaEnMiliSegundos;
    }
    eliminarReserva(reserva) {
        for (let i = 0; i < this.reservas.length; i++) {
            if (this.reservas[i].getVehiculo().getNumeroMatricula() == reserva.getVehiculo().getNumeroMatricula()) {
                this.reservas.splice(i);
            }
        }
    }
}
exports.default = SistemaDeAlquiler;
//# sourceMappingURL=sistemaDeAlquiler.js.map