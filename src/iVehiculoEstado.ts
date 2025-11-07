import Vehiculo from "./vehiculo";

export default interface IVehiculoEstado {

    alquilar(): void;
    devolver(): void;
    iniciarMantenimiento(): void;
    finalizarMantenimiento(): void;

    getNombre(): string;
    estaDisponible(): boolean;
    estaEnAlquiler(): boolean;
    estaEnMantenimiento(): boolean;

    setContexto(vehiculo: Vehiculo): void;

}