"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculadoraDuracion_1 = __importDefault(require("./calculadoraDuracion"));
const estadoDisponible_1 = __importDefault(require("./estadoDisponible"));
class Vehiculo {
    numeroMatricula;
    estado;
    tarifaBase;
    cargo;
    costoDeMantenimiento;
    kmDesdeElUltimoMantenimiento;
    fechaUltimoMantenimiento;
    alquileresCompletadosTotales;
    alquileresParaMantenimiento;
    rentabilidad;
    constructor(numeroMatricula, tarifaBase, cargo, costoDeMantenimiento) {
        this.numeroMatricula = numeroMatricula;
        this.estado = new estadoDisponible_1.default();
        this.estado.setContexto(this);
        this.tarifaBase = tarifaBase;
        this.cargo = cargo;
        this.costoDeMantenimiento = costoDeMantenimiento;
        this.kmDesdeElUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresCompletadosTotales = 0;
        this.alquileresParaMantenimiento = 0;
        this.rentabilidad = 0;
    }
    necesitaMantenimientoPorAlquileres() {
        return this.alquileresParaMantenimiento === 5;
    }
    necesitaMantenimientoPorKm() {
        return this.kmDesdeElUltimoMantenimiento >= 10000;
    }
    necesitaMantenimientoPorTiempo(fechaFinAlquiler) {
        const mecesTranscurridos = calculadoraDuracion_1.default.calcularDuracionEnMeces(this.fechaUltimoMantenimiento, fechaFinAlquiler);
        return mecesTranscurridos >= 12;
    }
    getCostoMantenimiento() {
        return this.costoDeMantenimiento;
    }
    getRentabilidad() {
        return this.rentabilidad;
    }
    disminuirRentabilidad(costoMantenimiento) {
        this.rentabilidad -= costoMantenimiento;
    }
    aumentarRentabilidad(ingresoPorAlquiler) {
        this.rentabilidad += ingresoPorAlquiler;
    }
    incrementarAlquileres() {
        this.alquileresCompletadosTotales++;
        this.alquileresParaMantenimiento++;
    }
    actualizarKilometros(totalKilometrosRecorridos) {
        this.kmDesdeElUltimoMantenimiento += totalKilometrosRecorridos;
    }
    getKmDesdeElUltimoMantenimiento() {
        return this.kmDesdeElUltimoMantenimiento;
    }
    getFechaUltimoMantenimiento() {
        return this.fechaUltimoMantenimiento;
    }
    getAlquileresCompletados() {
        return this.alquileresCompletadosTotales;
    }
    getNumeroMatricula() {
        return this.numeroMatricula;
    }
    getCantidadTotalAlquileres() {
        return this.alquileresCompletadosTotales;
    }
    setEstado(estado) {
        this.estado = estado;
        this.estado.setContexto(this);
    }
    estaEnAlquiler() {
        return this.estado.estaEnAlquiler();
    }
    estaDisponible() {
        return this.estado.estaDisponible();
    }
    estaEnMantenimiento() {
        return this.estado.estaEnMantenimiento();
    }
    intentarAlquilar() {
        this.estado.alquilar();
    }
    intentarDevolver() {
        this.estado.devolver();
    }
}
exports.default = Vehiculo;
//# sourceMappingURL=vehiculo.js.map