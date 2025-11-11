import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

/**
 * Representa un vehículo de tipo "Compacto".
 *
 * Este tipo de vehículo posee:
 * - Tarifa base fija de 30 unidades monetarias por día.
 * - Cargo adicional del 0.15 por kilómetro cuando excede los 100 km diarios.
 * - Costo de mantenimiento de 20 unidades.
 *
 * El costo final del alquiler se ajusta según el factor
 * correspondiente a la temporada seleccionada.
 */
export default class Compacto extends Vehiculo {

    /**
     * Crea una nueva instancia de un vehículo compacto.
     *
     * @param numeroMatricula - Número único de identificación del vehículo.
     *
     */
    constructor(numeroMatricula: string) {
        super(numeroMatricula, 30, 0.15, 20);
    }

    /**
     * Calcula el costo final del alquiler del vehículo.
     *
     * El cálculo utiliza:
     * - el kilometraje total recorrido,
     * - la cantidad de días reservados,
     * - el factor de ajuste de la temporada.
     *
     * Lógica:
     * - Se calcula el kilometraje promedio diario.
     * - Si supera los **100 km diarios**, se agrega un costo adicional 
     *   proporcional al cargo definido para la categoría.
     * - La tarifa base se ajusta con el factor proporcionado por la temporada.
     *
     * @param kilometrajeTotal - Total de kilómetros recorridos durante el alquiler.
     * @param diasReservados - Cantidad total de días de reserva.
     * @param temporada - Implementación de 'ITemporada' que proporciona el factor de ajuste.
     *
     * @returns El costo final calculado del alquiler.

     */
    public calcularCostoFinal(
        kilometrajeTotal: number,
        diasReservados: number,
        temporada: ITemporada
    ): number {
        let adicional: number = 0;
        let costoFinal: number;

        const kilometrajeDiario: number = kilometrajeTotal / diasReservados;
        const factorAjuste: number = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada: number = this.tarifaBase * factorAjuste;

        if (kilometrajeDiario > 100) {
            adicional = this.cargo * kilometrajeDiario;
        }

        costoFinal = diasReservados * (tarifaBaseAjustada + adicional);

        return costoFinal;
    }
}