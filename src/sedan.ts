import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo {
    constructor(numeroMatricula: string) {
        super(numeroMatricula, 50, 0.20, 25);
    }


    public calcularCostoFinal(kilometrajeTotal: number, diasReservados: number, temporada: ITemporada): number {
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