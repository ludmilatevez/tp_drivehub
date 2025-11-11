import ITemporada from "./iTemporada";

/**
 * Representa la temporada alta dentro del sistema de alquiler.
 *
 * La temporada alta incrementa los costos de alquiler aplicando un
 * factor de ajuste del **20%** sobre la tarifa base de cada vehículo.
 *
 * Este factor se utiliza por las clases de vehículos para calcular
 * el costo final del alquiler.
 */
export default class TemporadaAlta implements ITemporada {

    /**
     * Devuelve el factor de ajuste correspondiente a la temporada alta.
     *
     * @returns El valor **1.2**, equivalente a un aumento del 20%.
     */
    public obtenerFactorAjuste(): number {
        return 1.2;
    }
}
