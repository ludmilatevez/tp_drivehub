import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoEnAlquiler implements IVehiculoEstado {
    private vehiculo!: Vehiculo;

    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    public getNombre(): string {
        return "En alquiler";
    }

    public alquilar(): void {
        throw new Error("El vehiculo ya esta en alquiler");
    }

    public devolver(): void {
        this.vehiculo.setEstado(new EstadoDisponible());
    }

    public iniciarMantenimiento(): void {
        throw new Error("El vehiculo debe ser devuelto primero");
    }

    public finalizarMantenimiento(): void {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta en alquiler");
    }

    public estaDisponible(): boolean {
        return false;
    }

    public estaEnAlquiler(): boolean {
        return true;
    }

    public estaEnMantenimiento(): boolean {
        return false;
    }
}