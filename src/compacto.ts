import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo {
    constructor(numeroMatricula: string) {
        super(numeroMatricula, 30, 0.15, 20);
    }

    public calcularCostoFinal(kilometrajeTotal: number, diasReservados: number, temporada: ITemporada): number {
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