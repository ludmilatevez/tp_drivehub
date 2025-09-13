"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = __importDefault(require("./vehiculo"));
class Suv extends vehiculo_1.default {
    cargoPorSeguro;
    constructor(numeroMatricula) {
        super(numeroMatricula, "Disponible", 80, 0.25);
        this.cargoPorSeguro = 15;
    }
    calcularCostoFinal(kilometrajeDiario, diasReservados) {
        let adicional = 0;
        let costoFinal;
        if (kilometrajeDiario * diasReservados > 500) {
            adicional = this.cargo * kilometrajeDiario;
        }
        costoFinal = diasReservados * (this.tarifaBase + this.cargoPorSeguro + adicional);
        return costoFinal;
    }
}
exports.default = Suv;
//# sourceMappingURL=suv.js.map