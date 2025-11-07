"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = __importDefault(require("./vehiculo"));
class Suv extends vehiculo_1.default {
    cargoPorSeguro;
    constructor(numeroMatricula) {
        super(numeroMatricula, 80, 0.25, 30);
        this.cargoPorSeguro = 15;
    }
    calcularCostoFinal(kilometrajeTotal, diasReservados, temporada) {
        let adicional = 0;
        let costoFinal;
        const kilometrajeDiario = kilometrajeTotal / diasReservados;
        const factorAjuste = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada = this.tarifaBase * factorAjuste;
        if (kilometrajeDiario * diasReservados > 500) {
            adicional = this.cargo * kilometrajeDiario;
        }
        costoFinal = diasReservados * (tarifaBaseAjustada + this.cargoPorSeguro + adicional);
        return costoFinal;
    }
}
exports.default = Suv;
//# sourceMappingURL=suv.js.map