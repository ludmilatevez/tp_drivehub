import ITemporada from "./iTemporada";

export default class TemporadaMedia implements ITemporada {
    public obtenerFactorAjuste(): number {
        return 1;
    }
}