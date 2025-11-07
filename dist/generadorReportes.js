"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneradorReportes {
    repositorioVehiculos;
    repositorioReservas;
    constructor(repositorioVehiculos, repositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }
    vehiculosMasYMenosAlquilados(fechaInicio, fechaFin) {
        const reservasDentroDelPeriodo = this.repositorioReservas.obtenerReservasPorPeriodo(fechaInicio, fechaFin);
        const contadorAlquileres = new Map();
        for (const reserva of reservasDentroDelPeriodo) {
            const vehiculo = reserva.getVehiculo();
            const matricula = vehiculo.getNumeroMatricula();
            const cantidadTotalAlquileres = vehiculo.getCantidadTotalAlquileres();
            contadorAlquileres.set(matricula, cantidadTotalAlquileres);
        }
        let maxAlquileres = -1;
        let minAlquileres = Infinity;
        let maxAlquileresMatricula = "";
        let minAlquileresMatricula = "";
        for (const [patente, cantidadAlquileres] of contadorAlquileres.entries()) {
            if (cantidadAlquileres > maxAlquileres) {
                maxAlquileres = cantidadAlquileres;
                maxAlquileresMatricula = patente;
            }
            if (cantidadAlquileres < minAlquileres) {
                minAlquileres = cantidadAlquileres;
                minAlquileresMatricula = patente;
            }
        }
        if (reservasDentroDelPeriodo.length === 0) {
            console.log("en este periodo de tiempo no hubo reservas");
        }
        else {
            console.log(`en este periodo de tiempo el vehiculo mas alquilado tiene matricula: ${maxAlquileresMatricula} y fue alquilado: ${maxAlquileres} veces.
                
                y el vehiculo menos alquilado tiene matricula: ${minAlquileresMatricula} y fue alquilado: ${minAlquileres} veces.`);
        }
    }
    vehiculosConMasYMenosRentabilidad() {
        const vehiculos = this.repositorioVehiculos.obtenerTodos();
        let maxRentabilidad = -Infinity;
        let maxRentabilidadMatricula = "";
        let minRentabilidad = Infinity;
        let minRentabilidadMatricula = "";
        for (const vehiculo of vehiculos) {
            const rentabilidad = vehiculo.getRentabilidad();
            const matricula = vehiculo.getNumeroMatricula();
            if (rentabilidad > maxRentabilidad) {
                maxRentabilidad = rentabilidad;
                maxRentabilidadMatricula = matricula;
            }
            if (rentabilidad < minRentabilidad) {
                minRentabilidad = rentabilidad;
                minRentabilidadMatricula = matricula;
            }
        }
        if (vehiculos.length === 0) {
            console.log("aun no fue reservado ningun vehiculo");
        }
        else {
            console.log(`el vehiculo con mas rentabilidad tiene matricula: ${maxRentabilidadMatricula} y su rentabilidad fue: ${maxRentabilidad}.
                
                y el vehiculo con menos rentabilidad tiene matricula: ${minRentabilidadMatricula} y su rentabilidad fue: ${minRentabilidad}.`);
        }
    }
    calcularOcupacionDeFlota() {
        const vehiculos = this.repositorioVehiculos.obtenerTodos();
        const total = vehiculos.length;
        const vehiculosEnAlquiler = vehiculos.filter(vehiculo => vehiculo.estaEnAlquiler());
        const cantidadEnAlquiler = vehiculosEnAlquiler.length;
        const ocupacionFlota = (cantidadEnAlquiler / total) * 100;
        console.log(`la ocupacion de la flota es del: ${ocupacionFlota} %`);
    }
}
exports.default = GeneradorReportes;
//# sourceMappingURL=generadorReportes.js.map