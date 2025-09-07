import Vehiculo from "./vehiculo";

export default class Compacto extends Vehiculo{
    constructor(numeroMatricula: string) {
        super(numeroMatricula, "Disponible", 30, 0.15);
    }

    public calcularCostoFinal(kilometrajeDiario: number, diasReservados: number): number {
        let adicional: number = 0;
        let costoFinal: number;
        if (kilometrajeDiario > 100) {
            adicional = this.cargo * kilometrajeDiario;
        }

        costoFinal = diasReservados * (this.tarifaBase + adicional);
        
        return costoFinal;
    }
}