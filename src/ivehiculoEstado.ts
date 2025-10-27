import Vehiculo from "./vehiculo";

export default interface IVehiculoEstado {
    alquilar(vehiculo: Vehiculo): void;
    devolver(vehiculo: Vehiculo): void;
    iniciarMantenimiento(vehiculo: Vehiculo): void;

    getNombre(): string;
}