import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoEnMantenimiento implements IVehiculoEstado {
    private vehiculo!: Vehiculo;

    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    public getNombre(): string {
        return "En mantenimiento";
    }

    public alquilar(): void {
        throw new Error("no se puede alquilar un auto en mantenimiento");
    }

    public devolver(): void {
        throw new Error("el vehiculo ya fue devuelto y esta en mantenimiento");
    }

    public iniciarMantenimiento(): void {
        throw new Error("el vehiculo ya esta en mantenimiento");
    }

    public finalizarMantenimiento(): void {
        this.vehiculo.setEstado(new EstadoDisponible());
    }

    public estaDisponible(): boolean {
        return false;
    }

    public estaEnAlquiler(): boolean {
        return false;
    }

    public estaEnMantenimiento(): boolean {
        return true;
    }
}