"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadoDisponible_1 = __importDefault(require("./estadoDisponible"));
class EstadoEnMantenimiento {
    vehiculo;
    setContexto(vehiculo) {
        this.vehiculo = vehiculo;
    }
    getNombre() {
        return "En mantenimiento";
    }
    alquilar() {
        throw new Error("no se puede alquilar un auto en mantenimiento");
    }
    devolver() {
        throw new Error("el vehiculo ya fue devuelto y esta en mantenimiento");
    }
    iniciarMantenimiento() {
        throw new Error("el vehiculo ya esta en mantenimiento");
    }
    finalizarMantenimiento() {
        this.vehiculo.setEstado(new estadoDisponible_1.default());
    }
    estaDisponible() {
        return false;
    }
    estaEnAlquiler() {
        return false;
    }
    estaEnMantenimiento() {
        return true;
    }
}
exports.default = EstadoEnMantenimiento;
//# sourceMappingURL=estadoEnMantenimiento.js.map