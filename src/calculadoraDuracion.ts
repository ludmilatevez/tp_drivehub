/**
 * Clase utilitaria encargada de calcular la duración entre dos fechas.
 * Permite obtener la diferencia tanto en días como en meses,
 * considerando siempre el valor absoluto de la diferencia.
 */
export default class CalculadoraDuracion {

    /**
     * Calcula la duración en días entre dos fechas dadas.
     *
     * La duración se obtiene a partir de la diferencia en milisegundos
     * entre 'fechaInicio' y 'fechaFin', convirtiendo luego el resultado a días.
     * El valor retornado siempre es absoluto, por lo que no importa el orden
     * en que se pasen las fechas.
     *
     * @param fechaInicio - Fecha inicial del intervalo.
     * @param fechaFin - Fecha final del intervalo.
     * @returns Número de días transcurridos entre ambas fechas.
     *
     */
    public static calcularDuracionEnDias(fechaInicio: Date, fechaFin: Date): number {
        const diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();
        const unDiaEnMiliSegundos: number = 24 * 60 * 60 * 1000;
        const duracionEnDias: number = diferenciaEnMilisegundos / unDiaEnMiliSegundos;
        return Math.abs(duracionEnDias);
    }

    /**
     * Calcula la duración en meses entre dos fechas dadas.
     *
     * La duración se calcula considerando la diferencia total de años y meses
     * entre ambas fechas. El orden de las fechas no afecta el resultado,
     * ya que se retorna siempre el valor absoluto.
     *
     * @param fechaInicio - Fecha inicial del intervalo.
     * @param fechaFin - Fecha final del intervalo.
     * @returns Número de meses transcurridos entre ambas fechas.
     *
     */
    public static calcularDuracionEnMeses(fechaInicio: Date, fechaFin: Date): number {
        const diferenciaAnios: number = fechaFin.getFullYear() - fechaInicio.getFullYear();
        const diferenciaMeses: number = fechaFin.getMonth() - fechaInicio.getMonth();
        const mesesTranscurridos: number = (diferenciaAnios * 12) + diferenciaMeses;
        return Math.abs(mesesTranscurridos);
    }
}
