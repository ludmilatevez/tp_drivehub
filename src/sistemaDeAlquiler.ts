import Cliente from "./cliente";
import Vehiculo from "./vehiculo";
import Reserva from "./reserva";

export default class SistemaDeAlquiler {
    private vehiculos: Array<Vehiculo>
    private reservas: Array<Reserva>


    constructor() {
        this.vehiculos = new Array<Vehiculo>;
        this.reservas = new Array<Reserva>;
    }

    public agregarVehiculo(vehiculo:Vehiculo){
        this.vehiculos.push(vehiculo);
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

    private estaDisponible(vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date): boolean {

        let vehiculoEstaDisponible: boolean = this.verificarAutoDisponible(vehiculo);

        let horarioEstaDisponible: boolean = this.verificarHorarioDisponible(fechaInicio, fechaFin);

        return vehiculoEstaDisponible && horarioEstaDisponible;
    }


    private verificarAutoDisponible(vehiculo: Vehiculo): boolean {
        for (let auto of this.vehiculos) {
            if (auto.getNumeroMatricula() == vehiculo.getNumeroMatricula() && auto.getEstado() == "Disponible") {
                return true;
            }
        }

        return false;

    }

    private verificarHorarioDisponible(fechaInicio: Date, fechaFin: Date): boolean {
        for (let reserva of this.reservas) {
            if (fechaInicio < reserva.getFechaFin() && fechaFin > reserva.getFechaInicio()) {
                return false;
            } 
        }

        return true;
    }

    private calcularDuracionEnDias(fechaInicio: Date, fechaFin: Date) {
        let diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();

        let unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;

        return diferenciaEnMilisegundos / unDiaEnMiliSegundos;

    }

    private eliminarReserva(reserva: Reserva) {
        for (let i = 0; i < this.reservas.length; i++) {
            if (this.reservas[i].getVehiculo().getNumeroMatricula() == reserva.getVehiculo().getNumeroMatricula()) {
                this.reservas.splice(i);
            }
        }

        //excepcion si no encontre la reserva
    }

}