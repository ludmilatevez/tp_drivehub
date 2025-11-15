/**
 * Interfaz que representa el cálculo para ajustar la tarifa base
 * de un vehículo según la temporada del año.
 * Las distintas implementaciones (por ejemplo: TemporadaAlta, TemporadaMedia, TemporadaBaja) deben definir el factor multiplicador que se aplicará sobre la tarifa base.
 */
export default interface ITemporada {
    /**
     * Devuelve el factor de ajuste correspondiente a la temporada.
     * Un valor mayor que 1 incrementa el precio (por ejemplo, temporada alta), un valor igual a 1 lo mantiene estable, y un valor menor que 1 lo reduce (por ejemplo, temporada baja).
     * @returns El factor numérico de ajuste aplicado a la tarifa base.
     */
    obtenerFactorAjuste(): number;
}

