"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculadoraDuracion_1 = __importDefault(require("./calculadoraDuracion"));
const verificadorDisponibilidad_1 = __importDefault(require("./verificadorDisponibilidad"));
const estadoEnMantenimiento_1 = __importDefault(require("./estadoEnMantenimiento"));
class SistemaDeAlquiler {
    repositorioVehiculos;
    repositorioReservas;
    verificadorDisponibilidad;
    constructor(repositorioVehiculos, repositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
        this.verificadorDisponibilidad = new verificadorDisponibilidad_1.default(repositorioVehiculos, repositorioReservas);
    }
    agregarVehiculo(vehiculo) {
        this.repositorioVehiculos.agregarVehiculo(vehiculo);
    }
    crearReserva(cliente, vehiculo, fechaInicio, fechaFin, temporada) {
        if (this.verificadorDisponibilidad.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            this.repositorioReservas.agregarReserva(cliente, vehiculo, fechaInicio, fechaFin, temporada);
            vehiculo.intentarAlquilar();
        }
        else {
            throw new Error("el vehiculo solicitado no esta disponible para ser alquilado");
        }
    }
    entregarVehiculo(reserva, kilometrajeTotal) {
        const vehiculo = reserva.getVehiculo();
        const fechaInicio = reserva.getFechaInicio();
        const fechaFin = reserva.getFechaFin();
        const temporada = reserva.getTemporada();
        vehiculo.intentarDevolver();
        vehiculo.actualizarKilometros(kilometrajeTotal);
        vehiculo.incrementarAlquileres();
        if (vehiculo.necesitaMantenimientoPorKm() || vehiculo.necesitaMantenimientoPorTiempo(fechaFin) || vehiculo.necesitaMantenimientoPorAlquileres()) {
            vehiculo.setEstado(new estadoEnMantenimiento_1.default());
            const costoMantenimiento = vehiculo.getCostoMantenimiento();
            vehiculo.disminuirRentabilidad(costoMantenimiento);
        }
        const diasReservados = calculadoraDuracion_1.default.calcularDuracionEnDias(fechaInicio, fechaFin);
        const costoFinal = vehiculo.calcularCostoFinal(kilometrajeTotal, diasReservados, temporada);
        vehiculo.aumentarRentabilidad(costoFinal);
        this.repositorioReservas.eliminarReserva(reserva);
    }
}
exports.default = SistemaDeAlquiler;
//# sourceMappingURL=sistemaDeAlquiler.js.map