import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";
import {
    TARIFA_BASE_SUV,
    CARGO_SUV,
    COSTO_MATENIMIENTO_SUV,
    KM_SIN_RECARGO_SUV,
    CARGO_SEGURO_SUV
} from "./constantes";

/**
 * Representa un vehículo de tipo SUV dentro del sistema de alquiler.
 * Este tipo de vehículo posee:
 * - Una tarifa base más alta que otros modelos.
 * - Un cargo por kilometraje que se aplica solo cuando el uso total supera los 500 km.
 * - Un cargo adicional fijo por seguro.
 *
 * El costo final se calcula en función de:
 * - Los días reservados.
 * - El kilometraje diario.
 * - El factor de ajuste de la temporada.
 * - El cargo por seguro.
 * - Posibles cargos adicionales por kilometraje excesivo.
 */
export default class Suv extends Vehiculo {
    private cargoPorSeguro: number;

    /**
     * Construye una nueva SUV con sus valores específicos:
     * - Tarifa base: 80
     * - Cargo por km: 0.25
     * - Costo de mantenimiento: 30
     * - Cargo por seguro fijo: 15
     * @param numeroMatricula - Identificador único del vehículo.
     */
    constructor(numeroMatricula: string) {
        super(numeroMatricula, TARIFA_BASE_SUV, CARGO_SUV, COSTO_MATENIMIENTO_SUV);
        this.cargoPorSeguro = CARGO_SEGURO_SUV;
    }

    /**
     * Calcula el costo final del alquiler de la SUV.
     * Lógica:
     * 1. Se calcula el kilometraje diario.
     * 2. Se ajusta la tarifa base según el factor de la temporada.
     * 3. Si el uso total supera los 500 km:
     *  - Se agrega un cargo extra proporcional al kilometraje diario.
     * 4. Se suma el cargo por seguro.
     * 5. Se multiplica el resultado por la cantidad de días reservados.
     * @param kilometrajeTotal - Kilómetros recorridos durante toda la reserva.
     * @param diasReservados - Cantidad de días del alquiler.
     * @param temporada - Temporada que ajusta la tarifa base.
     * @returns Costo total final del alquiler.
     */
    public calcularCostoFinal(
        kilometrajeTotal: number,
        diasReservados: number,
        temporada: ITemporada): number {            
        let adicional: number = 0;
        let costoFinal: number;
        const kilometrajeDiario: number = kilometrajeTotal / diasReservados;
        const factorAjuste: number = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada: number = this.tarifaBase * factorAjuste;

        if (kilometrajeDiario * diasReservados > KM_SIN_RECARGO_SUV) {
            adicional = this.cargo * kilometrajeDiario;
        }

        costoFinal = diasReservados * (tarifaBaseAjustada + this.cargoPorSeguro + adicional);

        return costoFinal;
    }
}
