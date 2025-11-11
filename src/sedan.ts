import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

/**
 * Representa un vehículo de tipo Sedán dentro del sistema.
 *
 * Este tipo de vehículo tiene:
 * - Tarifa base de 50 por día.
 * - Cargo adicional de 0.20 por kilómetro.
 * - Valor de desgaste de 25.
 *
 * El cálculo de costo final depende del kilometraje diario y del factor
 * de ajuste proporcionado por la temporada.
 *
 */
export default class Sedan extends Vehiculo {
    /**
     * Crea un nuevo vehículo tipo Sedán.
     *
     * @param numeroMatricula - Identificador único del vehículo.
     */
    constructor(numeroMatricula: string) {
        super(numeroMatricula, 50, 0.20, 25);
    }

    /**
     * Calcula el costo total del alquiler del vehículo según:
     * - Kilometraje total recorrido.
     * - Días reservados.
     - Factor de ajuste de la temporada.
     * - Cargo adicional proporcional al kilometraje diario (siempre aplicado).
     *
     * Fórmula:
     * 
     * costo = diasReservados * (tarifaBase * factorAjuste + cargo * kmDiarios)
     * 
     *
     * @param kilometrajeTotal - Kilómetros recorridos durante el alquiler.
     * @param diasReservados - Cantidad de días de la reserva.
     * @param temporada - Temporada utilizada para ajustar la tarifa base.
     * @returns Costo final del alquiler.
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

        
        adicional = this.cargo * kilometrajeDiario;

        costoFinal = diasReservados * (tarifaBaseAjustada + adicional);

        return costoFinal;
    }
}
