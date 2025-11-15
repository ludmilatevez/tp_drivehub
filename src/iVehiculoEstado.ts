import Vehiculo from "./vehiculo";

/**
 * Interfaz que define el contrato para los distintos estados de un vehículo dentro del patrón de diseño State.
 * Cada implementación representa un estado concreto (por ejemplo: Disponible, EnAlquiler, EnMantenimiento), y controla cómo debe comportarse el vehículo cuando se solicita una acción según su estado actual.
 * Este patrón permite que 'Vehiculo' delegue el comportamiento específico en el objeto de estado correspondiente.
 */
export default interface IVehiculoEstado {

    /**
     * Intenta alquilar el vehículo.
     * Cada estado decidirá si la operación es válida o si debe lanzar un error.
     */
    alquilar(): void;

    /**
     * Intenta devolver el vehículo.
     * El comportamiento dependerá del estado actual.
     */
    devolver(): void;

    /**
     * Intenta iniciar el mantenimiento del vehículo.
     */
    iniciarMantenimiento(): void;

    /**
     * Intenta finalizar el mantenimiento del vehículo.
     */
    finalizarMantenimiento(): void;

    /**
     * Devuelve el nombre descriptivo del estado actual.
     * @returns Un string representando el nombre del estado.
     */
    getNombre(): string;

    /**
     * Indica si el vehículo se encuentra disponible para alquilar.
     * @returns 'true' si está disponible, 'false' en caso contrario.
     */
    estaDisponible(): boolean;

    /**
     * Indica si el vehículo se encuentra actualmente alquilado.
     * @returns 'true' si está alquilado, 'false' si no.
     */
    estaEnAlquiler(): boolean;

    /**
     * Indica si el vehículo se encuentra en mantenimiento.
     * @returns 'true' si está en mantenimiento, 'false' en caso contrario.
     */
    estaEnMantenimiento(): boolean;

    /**
     * Asocia el contexto (el vehículo) a este estado.
     * Permite que el estado modifique el estado del vehículo cuando sea necesario.
     * @param vehiculo - Instancia del vehículo propietario del estado.
     */
    setContexto(vehiculo: Vehiculo): void;
}
