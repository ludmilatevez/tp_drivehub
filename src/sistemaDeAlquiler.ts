import Cliente from "./cliente";
import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import CalculadoraDuracion from "./calculadoraDuracion";
import RepositorioReservas from "./repositorioReservas";
import VerificadorDisponibilidad from "./verificadorDisponibilidad";
import RepositorioVehiculos from "./repositorioVehiculos";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import ITemporada from "./iTemporada";

/**
 * Representa el sistema principal encargado de gestionar:
 * - Vehículos disponibles para alquiler.
 * - Reservas creadas por los clientes.
 * - Validación de disponibilidad.
 * - Procesos de devolución y cálculo de costos.
 *
 * Este sistema coordina los repositorios, actualiza estados de los vehículos
 * y calcula la rentabilidad generada por cada alquiler.
 */
export default class SistemaDeAlquiler {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;
    private verificadorDisponibilidad: VerificadorDisponibilidad;

    /**
     * Crea una nueva instancia del sistema de alquiler.
     *
     * @param repositorioVehiculos - Repositorio donde se almacenan los vehículos.
     * @param repositorioReservas - Repositorio donde se almacenan las reservas activas e históricas.
     */
    constructor(
        repositorioVehiculos: RepositorioVehiculos,
        repositorioReservas: RepositorioReservas
    ) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
        this.verificadorDisponibilidad = new VerificadorDisponibilidad(
            repositorioVehiculos,
            repositorioReservas
        );
    }

    /**
     * Agrega un nuevo vehículo al sistema.
     *
     * @param vehiculo - Vehículo a registrar en el repositorio.
     */
    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.repositorioVehiculos.agregarVehiculo(vehiculo);
    }

    /**
     * Crea una nueva reserva si el vehículo está disponible para el periodo indicado.
     *
     * Flujo:
     * 1. Verifica disponibilidad mediante el verificador.
     * 2. Si está disponible:
     *      - Registra la reserva.
     *      - Cambia el estado del vehículo a "En alquiler".
     * 3. Si no está disponible, lanza un error.
     *
     * @param cliente - Cliente que realiza la reserva.
     * @param vehiculo - Vehículo solicitado.
     * @param fechaInicio - Fecha de inicio del alquiler.
     * @param fechaFin - Fecha de fin del alquiler.
     * @param temporada - Temporada utilizada para ajustar tarifas.
     * @throws Error si el vehículo no está disponible.
     */
    public crearReserva(
        cliente: Cliente,
        vehiculo: Vehiculo,
        fechaInicio: Date,
        fechaFin: Date,
        temporada: ITemporada
    ): void {
        if (this.verificadorDisponibilidad.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            this.repositorioReservas.agregarReserva(
                cliente,
                vehiculo,
                fechaInicio,
                fechaFin,
                temporada
            );
            vehiculo.intentarAlquilar();
        } else {
            throw new Error("el vehiculo solicitado no esta disponible para ser alquilado");
        }
    }

    /**
     * Procesa la devolución de un vehículo asociado a una reserva.
     *
     * Flujo completo:
     * 1. Obtiene vehículo y datos de la reserva.
     * 2. Cambia el estado del vehículo a disponible.
     * 3. Actualiza:
     *      - Kilometraje
     *      - Contador de alquileres
     * 4. Verifica si el vehículo necesita mantenimiento:
     *      - Por kilometraje
     *      - Por tiempo
     *      - Por cantidad de alquileres
     *    Si lo requiere:
     *      - Cambia estado a mantenimiento.
     *      - Aplica costo de mantenimiento reduciendo rentabilidad.
     * 5. Calcula costo final del alquiler:
     *      - Días reservados
     *      - Temporada
     *      - Kilometraje
     * 6. Aumenta la rentabilidad en base al costo final.
     * 7. Elimina la reserva del repositorio.
     *
     * @param reserva - Reserva que se está cerrando.
     * @param kilometrajeTotal - Kilómetros recorridos durante el periodo de alquiler.
     */
    public entregarVehiculo(reserva: Reserva, kilometrajeTotal: number): void {
        const vehiculo: Vehiculo = reserva.getVehiculo();
        const fechaInicio: Date = reserva.getFechaInicio();
        const fechaFin: Date = reserva.getFechaFin();
        const temporada: ITemporada = reserva.getTemporada();

        vehiculo.intentarDevolver();

        vehiculo.actualizarKilometros(kilometrajeTotal);
        vehiculo.incrementarAlquileres();

        if (
            vehiculo.necesitaMantenimientoPorKm() ||
            vehiculo.necesitaMantenimientoPorTiempo(fechaFin) ||
            vehiculo.necesitaMantenimientoPorAlquileres()
        ) {
            vehiculo.setEstado(new EstadoEnMantenimiento());
            const costoMantenimiento: number = vehiculo.getCostoMantenimiento();
            vehiculo.disminuirRentabilidad(costoMantenimiento);
        }

        const diasReservados: number = CalculadoraDuracion.calcularDuracionEnDias(
            fechaInicio,
            fechaFin
        );

        const costoFinal: number = vehiculo.calcularCostoFinal(
            kilometrajeTotal,
            diasReservados,
            temporada
        );

        vehiculo.aumentarRentabilidad(costoFinal);

        this.repositorioReservas.eliminarReserva(reserva);
    }
}
