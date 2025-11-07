"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadoDisponible_1 = __importDefault(require("./estadoDisponible"));
class EstadoEnAlquiler {
    vehiculo;
    setContexto(vehiculo) {
        this.vehiculo = vehiculo;
    }
    getNombre() {
        return "En alquiler";
    }
    alquilar() {
        throw new Error("El vehiculo ya esta en alquiler");
    }
    devolver() {
        this.vehiculo.setEstado(new estadoDisponible_1.default());
    }
    iniciarMantenimiento() {
        throw new Error("El vehiculo debe ser devuelto primero");
    }
    finalizarMantenimiento() {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta en alquiler");
    }
    estaDisponible() {
        return false;
    }
    estaEnAlquiler() {
        return true;
    }
    estaEnMantenimiento() {
        return false;
    }
}
exports.default = EstadoEnAlquiler;
//# sourceMappingURL=estadoEnAlquiler.js.map