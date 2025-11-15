import Cliente from "./cliente";
import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

/**
 * Representa una reserva realizada por un cliente sobre un vehículo.
 * Una reserva contiene:
 * - Un identificador único.
 * - El cliente que realizó la reserva.
 * - El vehículo reservado.
 * - Fechas de inicio y fin.
 * - El tipo de temporada aplicable (que afecta el costo del alquiler).
 * Esta clase se utiliza principalmente por:
 * - RepositorioReservas
 * - Vehiculo (para registrar alquileres)
 * - GeneradorReportes
 */
export default class Reserva {

    private id: number;
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private fechaFin: Date;
    private temporada: ITemporada;

    /**
     * Crea una nueva reserva.
     * @param id - Identificador único asignado por el repositorio.
     * @param cliente - Cliente que realiza la reserva.
     * @param vehiculo - Vehículo reservado.
     * @param fechaInicio - Fecha de inicio del alquiler.
     * @param fechaFin - Fecha de finalización del alquiler.
     * @param temporada - Temporada que determina el factor de ajuste del costo.
     */
    constructor(
        id: number,
        cliente: Cliente,
        vehiculo: Vehiculo,
        fechaInicio: Date,
        fechaFin: Date,
        temporada: ITemporada
    ) {
        this.id = id;
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.temporada = temporada;
    }

    /**
     * Obtiene el identificador único de la reserva.
     * @returns El ID de la reserva.
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Obtiene la fecha de inicio del período reservado.
     * @returns Fecha de inicio.
     */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Obtiene la fecha de fin del período reservado.
     * @returns Fecha de finalización.
     */
    public getFechaFin(): Date {
        return this.fechaFin;
    }

    /**
     * Obtiene el vehículo asociado a esta reserva.
     * @returns El vehículo reservado.
     */
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /**
     * Obtiene el cliente que realizó la reserva.
     * @returns El cliente asociado.
     */
    public getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Obtiene la temporada asignada a esta reserva.
     * @returns Instancia de temporada.
     */
    public getTemporada(): ITemporada {
        return this.temporada;
    }
}
