import ITemporada from "./iTemporada";
import { FACTOR_AJUSTE_TEMPORADA_ALTA, FACTOR_AJUSTE_TEMPORADA_BAJA } from "./constantes";
/**
 * Representa la temporada baja dentro del sistema de alquiler.
 *
 * La temporada baja reduce los costos de alquiler aplicando un
 * factor de ajuste del **10%** de descuento sobre la tarifa base
 * de cada vehículo.
 *
 * Este factor es utilizado por las clases de vehículos para
 * calcular el costo final del alquiler.
 */
export default class TemporadaBaja implements ITemporada {

    /**
     * Devuelve el factor de ajuste correspondiente a la temporada baja.
     *
     * @returns El valor **0.9**, equivalente a un descuento del 10%.
     */
    public obtenerFactorAjuste(): number {
        return FACTOR_AJUSTE_TEMPORADA_BAJA;
    }
}
