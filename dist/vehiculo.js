"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehiculo {
    numeroMatricula;
    estado;
    tarifaBase;
    cargo;
    constructor(numeroMatricula, estado, tarifaBase, cargo) {
        this.numeroMatricula = numeroMatricula;
        this.estado = estado;
        this.tarifaBase = tarifaBase;
        this.cargo = cargo;
    }
    getNumeroMatricula() {
        return this.numeroMatricula;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    getEstado() {
        return this.estado;
    }
}
exports.default = Vehiculo;
//# sourceMappingURL=vehiculo.js.map