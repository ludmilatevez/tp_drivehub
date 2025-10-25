import RepositorioReservas from "./repositorioReservas";
import RepositorioVehiculos from "./repositorioVehiculos";
import Reserva from "./reserva";
import Vehiculo from "./vehiculo";

export default class VerificadorDisponibilidad {
    private repositorioVehiculos: RepositorioVehiculos;
    private repositorioReservas: RepositorioReservas;

    constructor(repositorioVehiculos: RepositorioVehiculos, repositorioReservas: RepositorioReservas) {
        this.repositorioVehiculos = repositorioVehiculos;
        this.repositorioReservas = repositorioReservas;
    }

    public estaDisponible(vehiculo: Vehiculo, fechainicio: Date, fechaFin: Date): boolean {
        const autoEstaDisponible: boolean = this.verificarAutoDisponible(vehiculo);
       
        if (!autoEstaDisponible) {
            return false;
        }

        const reservasConflicto: Array<Reserva>  = this.repositorioReservas.obtenerReservasEnConflicto(fechainicio, fechaFin);

        const conflictoParaEsteVehiculo = reservasConflicto.some(reserva =>
            reserva.getVehiculo().getNumeroMatricula() === vehiculo.getNumeroMatricula()
        );

        return !conflictoParaEsteVehiculo;
    }

    private verificarAutoDisponible(vehiculo: Vehiculo): boolean {
        const autoEncontrado = this.repositorioVehiculos.obtenerPorMatricula(vehiculo.getNumeroMatricula());

        return autoEncontrado !== undefined && autoEncontrado.getEstado() === "Disponible";
    }

}