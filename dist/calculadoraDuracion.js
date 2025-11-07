"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalculadoraDuracion {
    static calcularDuracionEnDias(fechaInicio, fechaFin) {
        const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
        const unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;
        const duracionEnDias = diferenciaEnMilisegundos / unDiaEnMiliSegundos;
        return duracionEnDias;
    }
    static calcularDuracionEnMeces(fechaInicio, fechaFin) {
        const diferenciaAnios = fechaFin.getFullYear() - fechaInicio.getFullYear();
        const diferenciaMeces = fechaFin.getMonth() - fechaInicio.getMonth();
        const mecesTranscurridos = (diferenciaAnios * 12) + diferenciaMeces;
        return mecesTranscurridos;
    }
}
exports.default = CalculadoraDuracion;
//# sourceMappingURL=calculadoraDuracion.js.map