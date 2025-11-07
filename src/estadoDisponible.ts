import EstadoEnAlquiler from "./estadoEnAlquiler";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoDisponible implements IVehiculoEstado {

    private vehiculo!: Vehiculo;

    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    public getNombre(): string {
        return "Disponible";
    }

    public alquilar(): void {
        this.vehiculo.setEstado(new EstadoEnAlquiler());
    }

    public devolver(): void {
        throw new Error("No se puede devolver un vehiculo que ya esta disponible");
    }

    public iniciarMantenimiento(): void {
        this.vehiculo.setEstado(new EstadoEnMantenimiento());
    }

    public finalizarMantenimiento(): void {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta disponible");
    }

    public estaDisponible(): boolean {
        return true;
    }

    public estaEnAlquiler(): boolean {
        return false;
    }

    public estaEnMantenimiento(): boolean {
        return false;
    }

}