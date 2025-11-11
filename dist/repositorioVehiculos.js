"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositorioVehiculos {
    vehiculos;
    constructor() {
        this.vehiculos = new Map();
    }
    agregarVehiculo(vehiculo) {
        this.vehiculos.set(vehiculo.getNumeroMatricula(), vehiculo);
    }
    obtenerPorMatricula(matricula) {
        return this.vehiculos.get(matricula);
    }
    obtenerTodos() {
        return Array.from(this.vehiculos.values());
    }
    eliminarPorMatricula(matricula) {
        const eliminado = this.vehiculos.delete(matricula);
        if (!eliminado) {
            throw new Error("vehiculo no encontrado");
        }
    }
}
exports.default = RepositorioVehiculos;
//# sourceMappingURL=repositorioVehiculos.js.map