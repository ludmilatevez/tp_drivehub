import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo {
    private cargoPorSeguro: number;

    constructor(numeroMatricula: string) {
        super(numeroMatricula, 80, 0.25, 30);
        this.cargoPorSeguro = 15;
    }


    public calcularCostoFinal(kilometrajeTotal: number, diasReservados: number, temporada: ITemporada): number {
        let adicional: number = 0;
        let costoFinal: number;
        const kilometrajeDiario: number = kilometrajeTotal / diasReservados;

        const factorAjuste: number = temporada.obtenerFactorAjuste();
        const tarifaBaseAjustada: number = this.tarifaBase * factorAjuste;

        if (kilometrajeDiario * diasReservados > 500) {
            adicional = this.cargo * kilometrajeDiario;
        }

        costoFinal = diasReservados * (tarifaBaseAjustada + this.cargoPorSeguro + adicional);

        return costoFinal;
    }
}
