export default abstract class Vehiculo {
    protected numeroMatricula: string;
    protected estado: string;

    protected tarifaBase: number;
    protected cargo: number;

    constructor(numeroMatricula: string, estado: string, tarifaBase: number, cargo: number) {
        this.numeroMatricula = numeroMatricula;
        this.estado = estado;

        this.tarifaBase = tarifaBase;
        this.cargo = cargo;
    }
    
    public getNumeroMatricula(): string {
        return this.numeroMatricula;
    }


    public setEstado(estado: string) {
        this.estado = estado;
    }

    public getEstado(): string {
        return this.estado;
    }

    public abstract calcularCostoFinal(kilometrajeDiario: number, diasReservados: number): number;



}