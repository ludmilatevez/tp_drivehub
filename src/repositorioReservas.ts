import Cliente from "./cliente";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class RepositorioReservas {
    private reservas: Map<number, Reserva>;
    private siguienteId: number = 1;

    constructor() {
        this.reservas = new Map<number, Reserva>;
    }

    public agregarReserva(cliente: Cliente
    , vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): void {
        const nuevaReserva: Reserva = new Reserva(this.siguienteId, cliente, vehiculo, fechaInicio, fechaFin);
        this.reservas.set(nuevaReserva.getId(), nuevaReserva);
    }

    public eliminarReserva(reserva: Reserva): void {
        const eliminado = this.reservas.delete(reserva.getId());
        if (!eliminado) {
            throw new Error("reserva no encontrada");
        }
    }

    public obtenerReservaPorId(id: number): Reserva | undefined {
        return this.reservas.get(id);
    }

    public obtenerReservasEnConflicto(fechaInicio: Date, fechaFin: Date): Array<Reserva> {
        const conflictos: Array<Reserva> = [];

        for (const reserva of this.reservas.values()) {
            if (fechaInicio < reserva.getFechaFin() && fechaFin > reserva.getFechaInicio()) {
                conflictos.push(reserva);
            }
        }

        return conflictos;
    }

    public obtenerTodas(): Array<Reserva> {
        return Array.from(this.reservas.values());
    }
}