import Cliente from "./cliente";
import ITemporada from "./iTemporada";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";
import { ID_RESERVA_INICIAL } from "./constantes";
/**
 * Repositorio encargado de gestionar las reservas activas y el historial completo de reservas.
 *
 * - Las **reservas activas** se almacenan en 'reservas'.
 * - El **historial** conserva todas las reservas creadas, incluso las eliminadas.
 * - Se genera un ID incremental para cada nueva reserva.
 *
 * Este repositorio proporciona operaciones de creación, eliminación, búsqueda
 * y detección de conflictos o reservas dentro de un período dado.
 */
export default class RepositorioReservas {

    private reservas: Map<number, Reserva>;
    private historialReservas: Map<number, Reserva>;
    private siguienteId: number = ID_RESERVA_INICIAL;

    /**
     * Crea un repositorio vacío de reservas.
     */
    constructor() {
        this.reservas = new Map<number, Reserva>();
        this.historialReservas = new Map<number, Reserva>();
    }

    /**
     * Crea y agrega una nueva reserva tanto al registro activo como al historial.
     *
     * @param cliente - Cliente que realiza la reserva.
     * @param vehiculo - Vehículo reservado.
     * @param fechaInicio - Fecha de inicio del período reservado.
     * @param fechaFin - Fecha de fin del período reservado.
     * @param temporada - Temporada que afecta el costo del vehículo.
     */
    public agregarReserva(
        cliente: Cliente,
        vehiculo: Vehiculo,
        fechaInicio: Date,
        fechaFin: Date,
        temporada: ITemporada
    ): void {
        const nuevaReserva: Reserva = new Reserva(
            this.siguienteId,
            cliente,
            vehiculo,
            fechaInicio,
            fechaFin,
            temporada
        );

        this.reservas.set(nuevaReserva.getId(), nuevaReserva);
        this.historialReservas.set(nuevaReserva.getId(), nuevaReserva);

        this.siguienteId++;
    }

    /**
     * Elimina una reserva activa.
     *
     * @param reserva - La reserva a eliminar.
     * @throws Error Si la reserva no existe en el registro activo.
     */
    public eliminarReserva(reserva: Reserva): void {
        const eliminado = this.reservas.delete(reserva.getId());
        if (!eliminado) {
            throw new Error("reserva no encontrada");
        }
    }

    /**
     * Obtiene una reserva activa por su ID.
     *
     * @param id - Identificador de la reserva.
     * @returns La reserva correspondiente o 'undefined' si no existe.
     */
    public obtenerReservaPorId(id: number): Reserva | undefined {
        return this.reservas.get(id);
    }

    /**
     * Obtiene todas las reservas activas que presentan conflicto
     * con un rango de fechas dado.
     *
     * Se considera conflicto cuando:
     * 'fechaInicio < reserva.fechaFin' **y**
     * 'fechaFin > reserva.fechaInicio'
     *
     * @param fechaInicio - Inicio del período a evaluar.
     * @param fechaFin - Fin del período a evaluar.
     * @returns Lista de reservas que se superponen con ese período.
     */
    public obtenerReservasEnConflicto(fechaInicio: Date, fechaFin: Date): Array<Reserva> {
        const conflictos: Array<Reserva> = [];

        for (const reserva of this.reservas.values()) {
            if (fechaInicio < reserva.getFechaFin() && fechaFin > reserva.getFechaInicio()) {
                conflictos.push(reserva);
            }
        }

        return conflictos;
    }

    /**
     * Obtiene todas las reservas (activas o no) que intersectan
     * con un período dado. Utiliza el historial completo.
     *
     * @param fechaInicio - Fecha mínima del período.
     * @param fechaFin - Fecha máxima del período.
     * @returns Lista de reservas ocurridas en ese rango.
     */
    public obtenerReservasPorPeriodo(fechaInicio: Date, fechaFin: Date): Array<Reserva> {
        const reservasDentroDelPeriodo: Array<Reserva> = [];

        for (const reserva of this.historialReservas.values()) {
            if (fechaInicio <= reserva.getFechaFin() && fechaFin >= reserva.getFechaInicio()) {
                reservasDentroDelPeriodo.push(reserva);
            }
        }

        return reservasDentroDelPeriodo;
    }

    /**
     * Obtiene todas las reservas activas.
     *
     * @returns Un array de las reservas actualmente activas.
     */
    public obtenerTodas(): Array<Reserva> {
        return Array.from(this.reservas.values());
    }
}
