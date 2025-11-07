import CalculadoraDuracion from "./calculadoraDuracion";
import EstadoDisponible from "./estadoDisponible";
import ITemporada from "./iTemporada";
import IVehiculoEstado from "./iVehiculoEstado";

export default abstract class Vehiculo {
    protected numeroMatricula: string;
    protected estado: IVehiculoEstado;

    protected tarifaBase: number;
    protected cargo: number;
    protected costoDeMantenimiento: number;

    protected kmDesdeElUltimoMantenimiento: number;
    protected fechaUltimoMantenimiento: Date;
    protected alquileresCompletadosTotales: number;
    protected alquileresParaMantenimiento: number;



    protected rentabilidad: number;

    constructor(numeroMatricula: string, tarifaBase: number, cargo: number, costoDeMantenimiento: number) {
        this.numeroMatricula = numeroMatricula;
        this.estado = new EstadoDisponible();
        this.estado.setContexto(this);
        this.tarifaBase = tarifaBase;
        this.cargo = cargo;
        this.costoDeMantenimiento = costoDeMantenimiento;

        this.kmDesdeElUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresCompletadosTotales = 0;
        this.alquileresParaMantenimiento = 0;

        this.rentabilidad = 0;

    }

    public necesitaMantenimientoPorAlquileres(): boolean {
        return this.alquileresParaMantenimiento === 5;
    }


    public necesitaMantenimientoPorKm(): boolean {
        return this.kmDesdeElUltimoMantenimiento >= 10000;
    }

    public necesitaMantenimientoPorTiempo(fechaFinAlquiler: Date): boolean {
        const mecesTranscurridos: number = CalculadoraDuracion.calcularDuracionEnMeces(this.fechaUltimoMantenimiento, fechaFinAlquiler);
        return mecesTranscurridos >= 12;
    }

    public getCostoMantenimiento(): number {
        return this.costoDeMantenimiento;
    }

    public getRentabilidad(): number {
        return this.rentabilidad;
    }

    public disminuirRentabilidad(costoMantenimiento: number): void {
        this.rentabilidad -= costoMantenimiento;
    }

    public aumentarRentabilidad(ingresoPorAlquiler: number): void {
        this.rentabilidad += ingresoPorAlquiler;
    }

    public incrementarAlquileres(): void {
        this.alquileresCompletadosTotales++;
        this.alquileresParaMantenimiento++;
    }

    public actualizarKilometros(totalKilometrosRecorridos: number): void {
        this.kmDesdeElUltimoMantenimiento += totalKilometrosRecorridos;
    }

    public getKmDesdeElUltimoMantenimiento(): number {
        return this.kmDesdeElUltimoMantenimiento;
    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public getAlquileresCompletados(): number {
        return this.alquileresCompletadosTotales;
    }

    public getNumeroMatricula(): string {
        return this.numeroMatricula;
    }

    public getCantidadTotalAlquileres(): number {
        return this.alquileresCompletadosTotales;
    }


    public setEstado(estado: IVehiculoEstado): void {
        this.estado = estado;
        this.estado.setContexto(this);
    }

    public estaEnAlquiler(): boolean {
        return this.estado.estaEnAlquiler();
    }

    public estaDisponible(): boolean {
        return this.estado.estaDisponible();
    }

    public estaEnMantenimiento(): boolean {
        return this.estado.estaEnMantenimiento();
    }

    public intentarAlquilar(): void {
        this.estado.alquilar();
    }


    public intentarDevolver(): void {
        this.estado.devolver();
    }

    public abstract calcularCostoFinal(kilometrajeTotal: number, diasReservados: number, temporada: ITemporada): number;



}