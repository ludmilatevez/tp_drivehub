import RepositorioReservas from "./repositorioReservas";
import RepositorioVehiculos from "./repositorioVehiculos";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

/**
 * Clase encargada de generar distintos reportes estadísticos sobre la flota de vehículos y las reservas realizadas.
 * Utiliza los repositorios de vehículos y reservas para obtener la información necesaria,aplicando cálculos sobre:
 * - Vehículos más y menos alquilados en un período.
 * - Vehículos con mayor y menor rentabilidad acumulada.
 * - Porcentaje de ocupación actual de la flota.
 * Esta clase no devuelve datos estructurados, sino que imprime los resultados por consola.
 */
export default class GeneradorReportes {

    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;

    /**
     * Crea una instancia de 'GeneradorReportes'.
     * @param repositorioVehiculos - Repositorio desde el cual se obtienen los vehículos.
     * @param repositorioReservas - Repositorio desde el cual se obtienen las reservas.
     */
    constructor(
        repositorioVehiculos: RepositorioVehiculos,
        repositorioReservas: RepositorioReservas
    ) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }

    /**
     * Reporta cuál fue el vehículo 'más' y 'menos alquilado dentro de un período.
     * El cálculo se basa en la cantidad total de alquileres registrados en cada vehículo
     * (método `getCantidadTotalAlquileres()`).
     * - Si no existen reservas en el período, se informa por consola.
     * - En caso contrario, se imprime la matrícula y cantidad de alquileres del más y menos solicitado.
     * @param fechaInicio - Fecha inicial del período a analizar.
     * @param fechaFin - Fecha final del período a analizar.
     */
    public vehiculosMasYMenosAlquilados(fechaInicio: Date, fechaFin: Date): void {
        const reservasDentroDelPeriodo: Reserva[] =
            this.repositorioReservas.obtenerReservasPorPeriodo(fechaInicio, fechaFin);

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
            console.log(
                `en este periodo de tiempo el vehiculo mas alquilado tiene matricula: ${maxAlquileresMatricula} y fue alquilado: ${maxAlquileres} veces.
                
                y el vehiculo menos alquilado tiene matricula: ${minAlquileresMatricula} y fue alquilado: ${minAlquileres} veces.`
            );
        }
    }

    /**
     * Reporta cuál es el vehículo con **mayor** y **menor** rentabilidad acumulada.
     * El valor de rentabilidad proviene del método `vehiculo.getRentabilidad()`, el cual se incrementa con ingresos y se reduce con costos de mantenimiento.
     * - Si no hay vehículos registrados, se informa por consola.
     * - En caso contrario, se muestran por consola las matrículas y rentabilidades extremas.
     */
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
            console.log(
                `el vehiculo con mas rentabilidad tiene matricula: ${maxRentabilidadMatricula} y su rentabilidad fue: ${maxRentabilidad}.
                
                y el vehiculo con menos rentabilidad tiene matricula: ${minRentabilidadMatricula} y su rentabilidad fue: ${minRentabilidad}.`
            );
        }
    }

    /**
     * Calcula el 'porcentaje de ocupación de la flota'.
     * El cálculo se realiza así: 
     * ocupación = (vehículos en alquiler / total de vehículos) * 100
     * El resultado se imprime por consola.
     */
    public calcularOcupacionDeFlota(): void {
        const vehiculos: Vehiculo[] = this.repositorioVehiculos.obtenerTodos();
        const total: number = vehiculos.length;

        const vehiculosEnAlquiler: Vehiculo[] =
            vehiculos.filter(vehiculo => vehiculo.estaEnAlquiler());

        const cantidadEnAlquiler: number = vehiculosEnAlquiler.length;

        const ocupacionFlota: number = (cantidadEnAlquiler / total) * 100;

        console.log(`la ocupacion de la flota es del: ${ocupacionFlota} %`);
    }
}
