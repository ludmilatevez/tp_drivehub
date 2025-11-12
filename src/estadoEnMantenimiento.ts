import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";
import { NOMBRE_ESTADO_EN_MANTENIMIENTO } from "./constantes";

/**
 * Representa el estado "En mantenimiento" dentro del patrón State utilizado por 'Vehiculo'.
 *
 * Un vehículo en mantenimiento:
 * - **No puede alquilarse**.
 * - **No puede devolverse**, porque ya está fuera de servicio.
 * - **No puede iniciar nuevamente el mantenimiento**.
 * - **Puede finalizar el mantenimiento**, lo que cambia su estado a 'EstadoDisponible'.
 *
 * Este estado modela el comportamiento del vehículo cuando se encuentra temporalmente fuera de uso.
 */
export default class EstadoEnMantenimiento implements IVehiculoEstado {

    private vehiculo!: Vehiculo;

    /**
     * Asocia el vehículo (contexto) a este estado.
     *
     * @param vehiculo - Vehículo cuyo estado se controla.
     */
    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    /**
     * Obtiene el nombre del estado.
     *
     * @returns "En mantenimiento".
     */
    public getNombre(): string {
        return NOMBRE_ESTADO_EN_MANTENIMIENTO;
    }

    /**
     * Intenta alquilar el vehículo.
     * Esto no es posible mientras esté en mantenimiento.
     *
     * @throws Error Siempre, indicando que no se puede alquilar un vehículo en mantenimiento.
     */
    public alquilar(): void {
        throw new Error("no se puede alquilar un auto en mantenimiento");
    }

    /**
     * Intenta devolver el vehículo.
     * No es válido, ya que el vehículo no está alquilado, sino en mantenimiento.
     *
     * @throws Error Siempre, indicando que el vehículo ya fue devuelto y está en mantenimiento.
     */
    public devolver(): void {
        throw new Error("el vehiculo ya fue devuelto y esta en mantenimiento");
    }

    /**
     * Intenta iniciar mantenimiento.
     * No se puede porque ya se encuentra en este estado.
     *
     * @throws Error Siempre, indicando que el mantenimiento ya está iniciado.
     */
    public iniciarMantenimiento(): void {
        throw new Error("el vehiculo ya esta en mantenimiento");
    }

    /**
     * Finaliza el mantenimiento del vehículo.
     * Esto cambia su estado a `EstadoDisponible`.
     */
    public finalizarMantenimiento(): void {
        this.vehiculo.setEstado(new EstadoDisponible());
    }

    /**
     * Indica si el vehículo está disponible.
     *
     * @returns 'false', porque está en mantenimiento.
     */
    public estaDisponible(): boolean {
        return false;
    }

    /**
     * Indica si el vehículo está en alquiler.
     *
     * @returns 'false', porque está en mantenimiento.
     */
    public estaEnAlquiler(): boolean {
        return false;
    }

    /**
     * Indica si el vehículo está en mantenimiento.
     *
     * @returns 'true'.
     */
    public estaEnMantenimiento(): boolean {
        return true;
    }
}
