import RepositorioReservas from "./repositorioReservas";
import RepositorioVehiculos from "./repositorioVehiculos";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class GeneradorReportes {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;

    constructor(repositorioVehiculos: RepositorioVehiculos, repositorioReservas: RepositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }

    public vehiculosMasYMenosAlquilados(fechaInicio: Date, fechaFin: Date): void {
        const reservasDentroDelPeriodo: Reserva[] = this.repositorioReservas.obtenerReservasPorPeriodo(fechaInicio, fechaFin);


        const contadorAlquileres: Map<string, number> = new Map();

        for (const reserva of reservasDentroDelPeriodo) {
            const vehiculo: Vehiculo = reserva.getVehiculo();
            const matricula: string = vehiculo.getNumeroMatricula();
            const cantidadTotalAlquileres: number = vehiculo.getCantidadTotalAlquileres();

            contadorAlquileres.set(matricula, cantidadTotalAlquileres);
        }

        let maxAlquileres: number = -1;
        let minAlquileres: number = Infinity;

        let maxAlquileresMatricula: string = "";
        let minAlquileresMatricula: string = "";

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
        } else {
            console.log(`en este periodo de tiempo el vehiculo mas alquilado tiene matricula: ${maxAlquileresMatricula} y fue alquilado: ${maxAlquileres} veces.
                
                y el vehiculo menos alquilado tiene matricula: ${minAlquileresMatricula} y fue alquilado: ${minAlquileres} veces.`);
        }

    }

    public vehiculosConMasYMenosRentabilidad(): void {
        const vehiculos: Vehiculo[] = this.repositorioVehiculos.obtenerTodos();

        let maxRentabilidad: number = -Infinity;
        let maxRentabilidadMatricula: string = "";
        let minRentabilidad: number = Infinity;
        let minRentabilidadMatricula: string = "";

        for (const vehiculo of vehiculos) {
            const rentabilidad: number = vehiculo.getRentabilidad();
            const matricula: string = vehiculo.getNumeroMatricula();

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
        } else {
            console.log(`el vehiculo con mas rentabilidad tiene matricula: ${maxRentabilidadMatricula} y su rentabilidad fue: ${maxRentabilidad}.
                
                y el vehiculo con menos rentabilidad tiene matricula: ${minRentabilidadMatricula} y su rentabilidad fue: ${minRentabilidad}.`);
        }
    }

    public calcularOcupacionDeFlota(): void {
        const vehiculos: Vehiculo[] = this.repositorioVehiculos.obtenerTodos();
        const total: number = vehiculos.length;

        const vehiculosEnAlquiler: Vehiculo[] = vehiculos.filter(vehiculo => vehiculo.estaEnAlquiler());

        const cantidadEnAlquiler: number = vehiculosEnAlquiler.length;

        const ocupacionFlota: number = (cantidadEnAlquiler / total) * 100;

        console.log(`la ocupacion de la flota es del: ${ocupacionFlota} %`);
    }


}
