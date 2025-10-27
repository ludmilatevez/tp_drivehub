import IVehiculoEstado from "./ivehiculoEstado";
import Vehiculo from "./vehiculo";

export default class EstadoDisponible implements IVehiculoEstado {
    public getNombre(): string {
        return "Disponible";
    }

    public alquilar(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new EstadoEnAlquiler());
    }

    public devolver(vehiculo: Vehiculo): void {
        throw new Error("No se puede devolver un vehiculo que ya esta disponible");
    }

    public iniciarMantenimiento(vehiculo: Vehiculo): void {
        vehiculo.setEstado(new EstadoEnMantenimiento());
    }
    
}