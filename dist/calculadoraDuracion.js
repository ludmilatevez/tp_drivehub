"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalculadoraDuracion {
    static calcularDuracionEnDias(fechaInicio, fechaFin) {
        const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
        const unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;
        const duracionEnDias = diferenciaEnMilisegundos / unDiaEnMiliSegundos;
        return Math.abs(duracionEnDias);
    }
    static calcularDuracionEnMeses(fechaInicio, fechaFin) {
        const diferenciaAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
        const diferenciaMeses = fechaFin.getMonth() - fechaInicio.getMonth();
        const mesesTranscurridos = (diferenciaAnios * 12) + diferenciaMeses;
        return Math.abs(mesesTranscurridos);
    }
}
exports.default = CalculadoraDuracion;
//# sourceMappingURL=calculadoraDuracion.js.map