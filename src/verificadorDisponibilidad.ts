import RepositorioReservas from "./repositorioReservas";
import RepositorioVehiculos from "./repositorioVehiculos";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

/**
 * Clase encargada de verificar si un vehículo está disponible
 * para ser alquilado dentro de un determinado período de tiempo.
 *
 * Combina dos validaciones:
 * - Estado actual del vehículo (disponible, en alquiler, en mantenimiento).
 * - Conflictos de fechas con reservas ya existentes.
 */
export default class VerificadorDisponibilidad {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;

    /**
     * Crea una nueva instancia del verificador de disponibilidad.
     *
     * @param repositorioVehiculos - Repositorio que almacena y gestiona los vehículos.
     * @param repositorioReservas - Repositorio que almacena y gestiona las reservas activas.
     */
    constructor(repositorioVehiculos: RepositorioVehiculos, repositorioReservas: RepositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }

    /**
     * Verifica si un vehículo está disponible entre dos fechas.
     *
     * La verificación se realiza en dos pasos:
     * 1. Se controla si el vehículo está marcado como disponible en su estado interno.
     * 2. Se comprueba si existen reservas que se solapen con el periodo solicitado.
     *
     * @param vehiculo - Vehículo a verificar.
     * @param fechainicio - Fecha de inicio del periodo deseado.
     * @param fechaFin - Fecha de fin del periodo deseado.
     * @returns 'true' si el vehículo está disponible, 'false' en caso contrario.
     */
    public estaDisponible(vehiculo: Vehiculo, fechainicio: Date, fechaFin: Date): boolean {
        const autoEstaDisponible: boolean = this.verificarAutoDisponible(vehiculo);

        if (!autoEstaDisponible) {
            return false;
        }

        const reservasConflicto: Array<Reserva> = this.repositorioReservas.obtenerReservasEnConflicto(
            fechainicio,
            fechaFin
        );

        for (const reservaConflicto of reservasConflicto) {
            if (reservaConflicto.getVehiculo().getNumeroMatricula() === vehiculo.getNumeroMatricula()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Verifica si un vehículo está registrado en el sistema
     * y si su estado actual indica que está disponible.
     *
     * @param vehiculo - Vehículo a comprobar.
     * @returns 'true' si existe en el repositorio y está disponible, 'false' si no.
     */
    private verificarAutoDisponible(vehiculo: Vehiculo): boolean {
        const autoEncontrado = this.repositorioVehiculos.obtenerPorMatricula(vehiculo.getNumeroMatricula());

        return autoEncontrado !== undefined && autoEncontrado.estaDisponible();
    }
}
