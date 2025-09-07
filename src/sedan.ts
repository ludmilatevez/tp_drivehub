import Vehiculo from "./vehiculo";

export default class Sedan extends Vehiculo{
    constructor(numeroMatricula: string) {
        super(numeroMatricula, "Disponible", 50, 0.20);
    }


    public calcularCostoFinal(kilometrajeDiario: number, diasReservados: number): number {
        let adicional: number = 0;
        let costoFinal: number;

        adicional = this.cargo * kilometrajeDiario;

        costoFinal = diasReservados * (this.tarifaBase + adicional);
        
        return costoFinal;
    }
}