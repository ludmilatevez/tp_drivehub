"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = __importDefault(require("./vehiculo"));
class Sedan extends vehiculo_1.default {
    constructor(numeroMatricula) {
        super(numeroMatricula, 50, 0.20, 25);
    }
    calcularCostoFinal(kilometrajeTotal, diasReservados, temporada) {
        let adicional = 0;
        let costoFinal;
        const kilometrajeDiario = kilometrajeTotal / diasReservados;
        const factorAjuste = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada = this.tarifaBase * factorAjuste;
        adicional = this.cargo * kilometrajeDiario;
        costoFinal = diasReservados * (tarifaBaseAjustada + adicional);
        return costoFinal;
    }
}
exports.default = Sedan;
//# sourceMappingURL=sedan.js.map