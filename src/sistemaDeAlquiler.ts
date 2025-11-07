import Cliente from "./cliente";
import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import CalculadoraDuracion from "./calculadoraDuracion";
import RepositorioReservas from "./repositorioReservas";
import VerificadorDisponibilidad from "./verificadorDisponibilidad";
import RepositorioVehiculos from "./repositorioVehiculos";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import ITemporada from "./iTemporada";

export default class SistemaDeAlquiler {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;
    private verificadorDisponibilidad: VerificadorDisponibilidad;

    constructor( repositorioVehiculos: RepositorioVehiculos, repositorioReservas: RepositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
        this.verificadorDisponibilidad = new VerificadorDisponibilidad(repositorioVehiculos, repositorioReservas);
    }

    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.repositorioVehiculos.agregarVehiculo(vehiculo);
    }

    public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date, temporada: ITemporada): void {

        if (this.verificadorDisponibilidad.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            this.repositorioReservas.agregarReserva(cliente, vehiculo, fechaInicio, fechaFin, temporada);
            vehiculo.intentarAlquilar();
        } else {
            throw new Error("el vehiculo solicitado no esta disponible para ser alquilado");
        }

    }

    public entregarVehiculo(reserva: Reserva, kilometrajeTotal: number): void {
        const vehiculo: Vehiculo = reserva.getVehiculo();
        const fechaInicio: Date = reserva.getFechaInicio();
        const fechaFin: Date = reserva.getFechaFin();
        const temporada: ITemporada = reserva.getTemporada();
        vehiculo.intentarDevolver();

        vehiculo.actualizarKilometros(kilometrajeTotal);
        vehiculo.incrementarAlquileres();

        if (vehiculo.necesitaMantenimientoPorKm() || vehiculo.necesitaMantenimientoPorTiempo(fechaFin) || vehiculo.necesitaMantenimientoPorAlquileres()) {
            vehiculo.setEstado(new EstadoEnMantenimiento());
            const costoMantenimiento: number = vehiculo.getCostoMantenimiento();
            vehiculo.disminuirRentabilidad(costoMantenimiento);

        }

        const diasReservados: number = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaFin);
        const costoFinal: number = vehiculo.calcularCostoFinal(kilometrajeTotal, diasReservados, temporada);
        vehiculo.aumentarRentabilidad(costoFinal);

        this.repositorioReservas.eliminarReserva(reserva);

    }


}