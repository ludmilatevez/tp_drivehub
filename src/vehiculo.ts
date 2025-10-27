import EstadoDisponible from "./estadoDisponible";
import IVehiculoEstado from "./ivehiculoEstado";

export default abstract class Vehiculo {
    protected numeroMatricula: string;
    protected estado: IVehiculoEstado;

    protected tarifaBase: number;
    protected cargo: number;


    protected kmDesdeElUltimoMantenimiento: number;
    protected fechaUltimoMantenimiento: Date;
    protected alquileresCompletados: number;//desde que volvio del mantenimiento?

    constructor(numeroMatricula: string, tarifaBase: number, cargo: number) {
        this.numeroMatricula = numeroMatricula;
        this.estado = new EstadoDisponible();
        this.tarifaBase = tarifaBase;
        this.cargo = cargo;

        this.kmDesdeElUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.alquileresCompletados = 0;

    }

    public getKmDesdeElUltimoMantenimiento(): number {
        return this.kmDesdeElUltimoMantenimiento;
    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public getAlquileresCompletados(): number {
        return this.alquileresCompletados;
    }
    
    public getNumeroMatricula(): string {
        return this.numeroMatricula;
    }


    public setEstado(estado: IVehiculoEstado) {
        this.estado = estado;
    }

    public getEstado(): string {
        return this.estado.getNombre();//provisorio, queda feo devolver el string para compararlo
    }

    public intentarAlquilar(): void {
        this.estado.alquilar(this);
    }


    public intentarDevolver(): void {
        this.estado.devolver(this);
    }

    public abstract calcularCostoFinal(kilometrajeDiario: number, diasReservados: number): number;



}