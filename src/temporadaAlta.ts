import ITemporada from "./iTemporada";

export default class TemporadaAlta implements ITemporada {
    public obtenerFactorAjuste(): number {
        return 1.2;
    }
}