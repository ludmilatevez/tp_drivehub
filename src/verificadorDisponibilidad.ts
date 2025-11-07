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

        const reservasConflicto: Array<Reserva> = this.repositorioReservas.obtenerReservasEnConflicto(fechainicio, fechaFin);

        for (const reservaConflicto of reservasConflicto) {
            if (reservaConflicto.getVehiculo().getNumeroMatricula() === vehiculo.getNumeroMatricula()) {
                return false;
            }
        }

        return true;
    }

    private verificarAutoDisponible(vehiculo: Vehiculo): boolean {
        const autoEncontrado = this.repositorioVehiculos.obtenerPorMatricula(vehiculo.getNumeroMatricula());

        return autoEncontrado !== undefined && autoEncontrado.estaDisponible();
    }

}