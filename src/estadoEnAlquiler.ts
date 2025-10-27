import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./ivehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoEnAlquiler implements IVehiculoEstado {
    public getNombre(): string {
        return "En alquiler";
    }

    public alquilar(vehiculo: Vehiculo): void {
        throw new Error("El vehiculo ya esta en alquiler");
    }

    public devolver(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new EstadoDisponible());//podria ser necesita limpieza y que luego el sistema lo vuelva a poner disponible, preguntar
    }

    public iniciarMantenimiento(vehiculo: Vehiculo): void {
        throw new Error("El vehiculo debe ser devuelto primero");
    }
}