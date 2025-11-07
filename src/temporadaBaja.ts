import ITemporada from "./iTemporada";

export default class TemporadaBaja implements ITemporada {
    public obtenerFactorAjuste(): number {
        return 0.9;
    }
}