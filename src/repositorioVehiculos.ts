import Vehiculo from "./vehiculo";

export default class RepositorioVehiculos {
    private vehiculos: Map<string, Vehiculo>;

    constructor() {
        this.vehiculos = new Map<string, Vehiculo>;
    }

    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.set(vehiculo.getNumeroMatricula(), vehiculo);
    }

    public obtenerPorMatricula(matricula: string): Vehiculo | undefined {
        return this.vehiculos.get(matricula);
    }

    public obtenerTodos(): Array<Vehiculo> {
        return Array.from(this.vehiculos.values());
    }

    public eliminarPorMatricula(matricula: string): void {
        const eliminado = this.vehiculos.delete(matricula);

        if (!eliminado) {
            throw new Error("vehiculo no encontrado");
        }
    }

}