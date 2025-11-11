import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";

/**
 * Representa el estado "En alquiler" dentro del patrón State utilizado por la clase 'Vehiculo'.
 *
 * Un vehículo en estado de alquiler:
 * - **No puede volver a alquilarse** (ya está alquilado).
 * - **Puede ser devuelto**, lo que cambia su estado a 'EstadoDisponible'.
 * - **No puede iniciar mantenimiento** mientras está alquilado.
 * - **No puede finalizar mantenimiento** porque no se encuentra en ese proceso.
 *
 * Este estado gestiona las reglas lógicas asociadas al ciclo de vida de un vehículo alquilado.
 */
export default class EstadoEnAlquiler implements IVehiculoEstado {

    /** Vehículo asociado a este estado. */
    private vehiculo!: Vehiculo;

    /**
     * Asocia el contexto (vehículo) a este estado.
     *
     * @param vehiculo - Vehículo cuyo estado se está administrando.
     */
    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    /**
     * Obtiene el nombre del estado.
     *
     * @returns El nombre del estado: "En alquiler".
     */
    public getNombre(): string {
        return "En alquiler";
    }

    /**
     * Intenta alquilar el vehículo.
     * No es posible porque el vehículo ya está alquilado.
     *
     * @throws Error Siempre, indicando que el vehículo ya está en alquiler.
     */
    public alquilar(): void {
        throw new Error("El vehiculo ya esta en alquiler");
    }

    /**
     * Devuelve el vehículo.
     * Esto cambia su estado a 'EstadoDisponible'.
     *
     * @example
     * estado.devolver(); // EnAlquiler --> Disponible
     */
    public devolver(): void {
        this.vehiculo.setEstado(new EstadoDisponible());
    }

    /**
     * Intenta iniciar el mantenimiento.
     * No es posible mientras el vehículo está alquilado.
     *
     * @throws Error Si se intenta iniciar mantenimiento sin haber devuelto el vehículo.
     */
    public iniciarMantenimiento(): void {
        throw new Error("El vehiculo debe ser devuelto primero");
    }

    /**
     * Intenta finalizar el mantenimiento.
     * No se puede porque el vehículo en alquiler no está en mantenimiento.
     *
     * @throws Error Siempre, ya que no corresponde a este estado.
     */
    public finalizarMantenimiento(): void {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta en alquiler");
    }

    /**
     * Indica si el vehículo está disponible.
     *
     * @returns 'false', porque un vehículo alquilado no está disponible.
     */
    public estaDisponible(): boolean {
        return false;
    }

    /**
     * Indica si el vehículo está en alquiler.
     *
     * @returns 'true', porque este estado representa un vehículo alquilado.
     */
    public estaEnAlquiler(): boolean {
        return true;
    }

    /**
     * Indica si el vehículo está en mantenimiento.
     *
     * @returns 'false', ya que un vehículo alquilado no está en mantenimiento.
     */
    public estaEnMantenimiento(): boolean {
        return false;
    }
}