import Vehiculo from "./vehiculo";

/**
 * Repositorio encargado de almacenar y gestionar los vehículos del sistema.
 * - Los vehículos se guardan en un 'Map' usando la matrícula como clave única.
 * - Permite operaciones de alta, baja, búsqueda y obtención de todo el inventario.
 * Esta clase actúa como una capa de persistencia en memoria para los vehículos.
 */
export default class RepositorioVehiculos {

    private vehiculos: Map<string, Vehiculo>;

    /**
     * Crea un repositorio vacío de vehículos.
     */
    constructor() {
        this.vehiculos = new Map<string, Vehiculo>();
    }

    /**
     * Agrega un vehículo al repositorio.
     * Si ya existe otro vehículo con la misma matrícula, lo reemplaza.
     * @param vehiculo - El vehículo a agregar.
     */
    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.set(vehiculo.getNumeroMatricula(), vehiculo);
    }

    /**
     * Obtiene un vehículo por su matrícula.
     * @param matricula - Matrícula del vehículo buscado.
     * @returns El vehículo correspondiente o 'undefined' si no existe.
     */
    public obtenerPorMatricula(matricula: string): Vehiculo | undefined {
        return this.vehiculos.get(matricula);
    }

    /**
     * Obtiene todos los vehículos registrados en el repositorio.
     * @returns Un array con todos los vehículos.
     */
    public obtenerTodos(): Array<Vehiculo> {
        return Array.from(this.vehiculos.values());
    }

    /**
     * Elimina un vehículo por su matrícula.
     * @param matricula - Matrícula del vehículo a eliminar.
     * @throws Error Si no existe un vehículo con esa matrícula.
     */
    public eliminarPorMatricula(matricula: string): void {
        const eliminado = this.vehiculos.delete(matricula);

        if (!eliminado) {
            throw new Error("vehiculo no encontrado");
        }
    }
}
