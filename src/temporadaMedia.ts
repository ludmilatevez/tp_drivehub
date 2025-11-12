import ITemporada from "./iTemporada";
import { FACTOR_AJUSTE_TEMPORADA_MEDIA } from "./constantes";
/**
 * Representa la temporada media en el sistema de alquiler.
 *
 * La temporada media no modifica la tarifa base del vehículo,
 * ya que aplica un factor de ajuste neutral equivalente a **1**.
 *
 * Este valor se utiliza por las clases de vehículos para calcular
 * el costo final del alquiler.
 */
export default class TemporadaMedia implements ITemporada {

    /**
     * Devuelve el factor de ajuste correspondiente a la temporada media.
     *
     * @returns El valor **1**, que no altera la tarifa base.
     */
    public obtenerFactorAjuste(): number {
        return FACTOR_AJUSTE_TEMPORADA_MEDIA;
    }
}
