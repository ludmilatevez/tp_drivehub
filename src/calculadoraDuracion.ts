export default class CalculadoraDuracion {
    public static calcularDuracionEnDias(fechaInicio: Date, fechaFin: Date): number {
        const diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();

        const unDiaEnMiliSegundos: number = 24 * 60 * 60 * 1000;

        const duracionEnDias: number = diferenciaEnMilisegundos / unDiaEnMiliSegundos;

        return duracionEnDias;

    }

    public static calcularDuracionEnMeces(fechaInicio: Date, fechaFin: Date): number {
        const diferenciaAnios: number = fechaFin.getFullYear() - fechaInicio.getFullYear();
        const diferenciaMeces: number = fechaFin.getMonth() - fechaInicio.getMonth();

        const mecesTranscurridos: number = (diferenciaAnios * 12) + diferenciaMeces;

        return mecesTranscurridos;

    }

}