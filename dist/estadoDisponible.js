"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const estadoEnAlquiler_1 = __importDefault(require("./estadoEnAlquiler"));
const estadoEnMantenimiento_1 = __importDefault(require("./estadoEnMantenimiento"));
class EstadoDisponible {
    vehiculo;
    setContexto(vehiculo) {
        this.vehiculo = vehiculo;
    }
    getNombre() {
        return "Disponible";
    }
    alquilar() {
        this.vehiculo.setEstado(new estadoEnAlquiler_1.default());
    }
    devolver() {
        throw new Error("No se puede devolver un vehiculo que ya esta disponible");
    }
    iniciarMantenimiento() {
        this.vehiculo.setEstado(new estadoEnMantenimiento_1.default());
    }
    finalizarMantenimiento() {
        throw new Error("No se puede finalizar el mantenimiento de un vehiculo que esta disponible");
    }
    estaDisponible() {
        return true;
    }
    estaEnAlquiler() {
        return false;
    }
    estaEnMantenimiento() {
        return false;
    }
}
exports.default = EstadoDisponible;
//# sourceMappingURL=estadoDisponible.js.map