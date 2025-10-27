import IVehiculoEstado from "./ivehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoEnMantenimiento implements IVehiculoEstado {
    public getNombre(): string {
        return "En mantenimiento";
    }

    public alquilar(vehiculo: Vehiculo): void {
        throw new Error("no se puede alquilar un auto en mantenimiento");
    }

    public devolver(vehiculo: Vehiculo): void {
        throw new Error("el vehiculo ya fue devuelto y esta en mantenimiento");
    }

    public iniciarMantenimiento(vehiculo: Vehiculo): void {
        throw new Error("el vehiculo ya esta en mantenimiento");
    }
}