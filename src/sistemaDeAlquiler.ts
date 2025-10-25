import Cliente from "./cliente";
import Vehiculo from "./vehiculo";
import Reserva from "./reserva";
import CalculadoraDuracion from "./calculadoraDuracion";
import RepositorioReservas from "./repositorioReservas";
import VerificadorDisponibilidad from "./verificadorDisponibilidad";
import RepositorioVehiculos from "./repositorioVehiculos";

export default class SistemaDeAlquiler {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;
    private verificadorDisponibilidad: VerificadorDisponibilidad;

    constructor(
        repositorioVehiculos: RepositorioVehiculos,
        repositorioReservas: RepositorioReservas,
    ) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
        this.verificadorDisponibilidad = new VerificadorDisponibilidad(repositorioVehiculos, repositorioReservas);
    }

    public agregarVehiculo(vehiculo:Vehiculo) {
        this.repositorioVehiculos.agregarVehiculo(vehiculo);
    }

    public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {

        if (this.verificadorDisponibilidad.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            this.repositorioReservas.agregarReserva(cliente, vehiculo, fechaInicio, fechaFin);
            vehiculo.setEstado("En alquiler");
        } else {
            throw new Error("el vehiculo solicitado no esta disponible para ser alquilado");
        }

    }

    public entregarVehiculo(reserva: Reserva, kilometrajeDiario: number) {
        const vehiculo: Vehiculo = reserva.getVehiculo();
        const fechaInicio: Date = reserva.getFechaInicio();
        const fechaFin: Date = reserva.getFechaFin();

        const diasReservados: number = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaFin);

        const costoFinal: number = vehiculo.calcularCostoFinal(kilometrajeDiario, diasReservados);


        vehiculo.setEstado("Disponible");

        this.repositorioReservas.eliminarReserva(reserva);

    }


}