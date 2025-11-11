import EstadoEnAlquiler from "./estadoEnAlquiler";
import EstadoEnMantenimiento from "./estadoEnMantenimiento";
import IVehiculoEstado from "./iVehiculoEstado";
import Vehiculo from "./vehiculo";

/**
 * Representa el estado "Disponible" dentro del patrón State aplicado a Vehiculo.
 *
 * Un vehículo en estado disponible:
 * - Puede ser alquilado.
 * - Puede iniciar un proceso de mantenimiento.
 * - NO puede ser devuelto (ya está disponible).
 * - NO puede finalizar mantenimiento.
 *
 * Cada operación que implica un cambio de estado delega en el propio vehículo
 * la transición hacia un nuevo estado.
 */
export default class EstadoDisponible implements IVehiculoEstado {

    /** Vehículo asociado al estado actual. */
    private vehiculo!: Vehiculo;

    /**
     * Asocia el contexto (vehículo) al estado.
     *
     * @param vehiculo - Instancia del vehículo que utiliza este estado.
     */
    public setContexto(vehiculo: Vehiculo): void {
        this.vehiculo = vehiculo;
    }

    /**
     * Obtiene el nombre del estado.
     *
     * @returns El nombre del estado: "Disponible".
     */
    public getNombre(): string {
        return "Disponible";
    }

    /**
     * Intenta alquilar el vehículo.
     * Si está disponible, cambia al estado 'EstadoEnAlquiler'.
     */
    public alquilar(): void {
        this.vehiculo.setEstado(new EstadoEnAlquiler());
    }

    /**
     * Intenta devolver el vehículo.
     * No es posible devolver un vehículo que ya está disponible.
     *
     * @throws Error Cuando se intenta devolver un vehículo disponible.
     */
    public devolver(): void {
        throw new Error("No se puede devolver un vehiculo que ya esta disponible");
    }

    /**
     * Inicia el mantenimiento del vehículo.
     * El estado cambia a 'EstadoEnMantenimiento'.
     */
    public iniciarMantenimiento(): void {
        this.vehiculo.setEstado(new EstadoEnMantenimiento());
    }

    /**
     * Intenta finalizar el mantenimiento.
     * No es posible finalizar mantenimiento de un vehículo disponible.
     *
     * @throws Error Si el vehículo no se encuentra en mantenimiento.
     */
    public finalizarMantenimiento(): void {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta disponible");
    }

    /**
     * Indica si el vehículo está disponible.
     *
     * @returns 'true', ya que este estado representa disponibilidad.
     */
    public estaDisponible(): boolean {
        return true;
    }

    /**
     * Indica si el vehículo está alquilado.
     *
     * @returns 'false', ya que un vehículo disponible no está en alquiler.
     */
    public estaEnAlquiler(): boolean {
        return false;
    }

    /**
     * Indica si el vehículo está en mantenimiento.
     *
     * @returns 'false', ya que un vehículo disponible no está en mantenimiento.
     */
    public estaEnMantenimiento(): boolean {
        return false;
    }
}