import Vehiculo from "./vehiculo";

export default class Suv extends Vehiculo{
    private cargoPorSeguro: number;

    constructor(numeroMatricula: string) {
        super(numeroMatricula, "Disponible", 80, 0.25);
        this.cargoPorSeguro = 15;
    }


    public calcularCostoFinal(kilometrajeDiario: number, diasReservados: number): number {
        let adicional: number = 0;
        let costoFinal: number;
        if (kilometrajeDiario * diasReservados > 500) {
            adicional = this.cargo * kilometrajeDiario;
        }

        costoFinal = diasReservados * (this.tarifaBase + this.cargoPorSeguro + adicional);
        
        return costoFinal;
    }
}
