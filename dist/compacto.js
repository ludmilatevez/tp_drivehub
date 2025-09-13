"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = __importDefault(require("./vehiculo"));
class Compacto extends vehiculo_1.default {
    constructor(numeroMatricula) {
        super(numeroMatricula, "Disponible", 30, 0.15);
    }
    calcularCostoFinal(kilometrajeDiario, diasReservados) {
        let adicional = 0;
        let costoFinal;
        if (kilometrajeDiario > 100) {
            adicional = this.cargo * kilometrajeDiario;
        }
        costoFinal = diasReservados * (this.tarifaBase + adicional);
        return costoFinal;
    }
}
exports.default = Compacto;
//# sourceMappingURL=compacto.js.map