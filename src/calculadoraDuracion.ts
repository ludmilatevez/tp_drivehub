export default class CalculadoraDuracion {
        public static calcularDuracionEnDias(fechaInicio: Date, fechaFin: Date) {
        let diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();

        let unDiaEnMiliSegundos = 24 * 60 * 60 * 1000;

        return diferenciaEnMilisegundos / unDiaEnMiliSegundos;

    }

}