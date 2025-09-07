import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class SistemaDeAlquiler {
    private vehiculos: Array<Vehiculo>
    private reservas: Array<Reserva>


    constructor() {
        this.vehiculos = new Array<Vehiculo>;
        this.reservas = new Array<Reserva>;
    }

    public crearReserva(cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date) {

        if (this.estaDisponible(vehiculo, fechaInicio, fechaFin)) {
            const reserva: Reserva = new Reserva(cliente, vehiculo, fechaInicio, fechaFin);
            this.reservas.push(reserva);
            vehiculo.setEstado("En alquiler");
        } else {
            throw new Error("el vehiculo solicitado no esta disponible");
        }

    }

    public entregarVehiculo(reserva: Reserva, kilometrajeDiario: number) {
        const vehiculo: Vehiculo = reserva.getVehiculo();
        const cliente: Cliente = reserva.getCliente();
        const fechaInicio: Date = reserva.getFechaInicio();
        const fechaFin: Date = reserva.getFechaFin();

        const diasReservados: number = this.calcularDuracionEnDias(fechaInicio, fechaFin);

        const costoFinal: number = vehiculo.calcularCostoFinal(kilometrajeDiario, diasReservados);

        vehiculo.setEstado("Disponible");

        this.eliminarReserva(reserva);

    }





}