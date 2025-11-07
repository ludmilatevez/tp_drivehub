"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = __importDefault(require("./vehiculo"));
class Compacto extends vehiculo_1.default {
    constructor(numeroMatricula) {
        super(numeroMatricula, 30, 0.15, 20);
    }
    calcularCostoFinal(kilometrajeTotal, diasReservados, temporada) {
        let adicional = 0;
        let costoFinal;
        const kilometrajeDiario = kilometrajeTotal / diasReservados;
        const factorAjuste = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada = this.tarifaBase * factorAjuste;
        if (kilometrajeDiario > 100) {
            adicional = this.cargo * kilometrajeDiario;
        }
        costoFinal = diasReservados * (tarifaBaseAjustada + adicional);
        return costoFinal;
    }
}
exports.default = Compacto;
//# sourceMappingURL=compacto.js.map