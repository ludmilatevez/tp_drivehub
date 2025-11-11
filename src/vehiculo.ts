import CalculadoraDuracion from "./calculadoraDuracion";
import EstadoDisponible from "./estadoDisponible";
import ITemporada from "./iTemporada";
import IVehiculoEstado from "./iVehiculoEstado";

/**
 * Clase abstracta que representa un vehículo dentro del sistema de alquiler.
 * 
 * Implementa toda la lógica común relacionada con:
 * - Estados del vehículo (disponible, en alquiler, en mantenimiento)
 * - Control de mantenimiento por:
 *      - kilómetros recorridos,
 *      - tiempo transcurrido,
 *      - cantidad de alquileres,
 * - Cálculo de rentabilidad,
 * - Gestión de kilometraje y alquileres.
 *
 * Las subclases deben implementar el método abstracto 'calcularCostoFinal',
 * que define cómo se calcula el costo total del alquiler según el tipo de vehículo.
 */
export default abstract class Vehiculo {
    /** Número de matrícula único del vehículo. */
    protected numeroMatricula: string;

    /** Estado actual del vehículo (patrón State). */
    protected estado: IVehiculoEstado;

    /** Tarifa base diaria del vehículo. */
    protected tarifaBase: number;

    /** Cargo adicional por kilómetro, depende del tipo de vehículo. */
    protected cargo: number;

    /** Costo del mantenimiento que se descuenta de la rentabilidad. */
    protected costoDeMantenimiento: number;

    /** Kilómetros acumulados desde el último mantenimiento. */
    protected kmDesdeElUltimoMantenimiento: number;

    /** Fecha en la que se realizó el último mantenimiento. */
    protected fechaUltimoMantenimiento: Date;

    /** Cantidad total de alquileres completados. */
    protected alquileresCompletadosTotales: number;

    /** Cantidad de alquileres desde el último mantenimiento. */
    protected alquileresParaMantenimiento: number;

    /** Rentabilidad total generada por el vehículo. */
    protected rentabilidad: number;

    /**
     * Inicializa un vehículo estableciendo su matrícula, tarifas y estado inicial.
     *
     * @param numeroMatricula Matrícula única del vehículo.
     * @param tarifaBase Tarifa base diaria del vehículo.
     * @param cargo Cargo por kilómetro o condición especial (según el tipo).
     * @param costoDeMantenimiento Costo del mantenimiento preventivo del vehículo.
     */
    constructor(
        numeroMatricula: string,
        tarifaBase: number,
        cargo: number,
        costoDeMantenimiento: number
    ) {
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

    

    // ---------------------- MANTENIMIENTO ------------------------    
    /**
     * Determina si el vehículo necesita mantenimiento debido a la cantidad de alquileres.
     * 
     * @returns 'true' si se completaron 5 alquileres desde el último mantenimiento.
     */
    public necesitaMantenimientoPorAlquileres(): boolean {
        return this.alquileresParaMantenimiento === 5;
    }

    /**
     * Determina si el vehículo requiere mantenimiento por kilometraje.
     *
     * @returns 'true' si recorrió al menos 10.000 km desde el último mantenimiento.
     */
    public necesitaMantenimientoPorKm(): boolean {
        return this.kmDesdeElUltimoMantenimiento >= 10000;
    }

    /**
     * Determina si el vehículo debe recibir mantenimiento por tiempo.
     *
     * @param fechaFinAlquiler Fecha en que finaliza el alquiler.
     * @returns 'true' si transcurrieron 12 o más meses desde el último mantenimiento.
     */
    public necesitaMantenimientoPorTiempo(fechaFinAlquiler: Date): boolean {
        const meses = CalculadoraDuracion.calcularDuracionEnMeses(
            this.fechaUltimoMantenimiento,
            fechaFinAlquiler
        );
        return meses >= 12;
    }

    /**
     * @returns El costo del mantenimiento preventivo del vehículo.
     */
    public getCostoMantenimiento(): number {
        return this.costoDeMantenimiento;
    }
    

    /** @returns La rentabilidad total acumulada del vehículo. */
    public getRentabilidad(): number {
        return this.rentabilidad;
    }

    /**
     * Resta de la rentabilidad el costo del mantenimiento.
     *
     * @param costoMantenimiento Monto a descontar.
     */
    public disminuirRentabilidad(costoMantenimiento: number): void {
        this.rentabilidad -= costoMantenimiento;
    }

    /**
     * Suma a la rentabilidad el ingreso obtenido por el alquiler.
     *
     * @param ingresoPorAlquiler Importe generado.
     */
    public aumentarRentabilidad(ingresoPorAlquiler: number): void {
        this.rentabilidad += ingresoPorAlquiler;
    }
  
   
    /** Incrementa las estadísticas de alquiler del vehículo. */
    public incrementarAlquileres(): void {
        this.alquileresCompletadosTotales++;
        this.alquileresParaMantenimiento++;
    }

    /**
     * Acumula los kilómetros recorridos desde el último mantenimiento.
     *
     * @param totalKilometrosRecorridos Kilómetros del alquiler actual.
     */
    public actualizarKilometros(totalKilometrosRecorridos: number): void {
        this.kmDesdeElUltimoMantenimiento += totalKilometrosRecorridos;
    }

    /** @returns Km recorridos desde el último mantenimiento. */
    public getKmDesdeElUltimoMantenimiento(): number {
        return this.kmDesdeElUltimoMantenimiento;
    }

    /** @returns Fecha del último mantenimiento. */
    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    /** @returns Cantidad total de alquileres completados. */
    public getAlquileresCompletados(): number {
        return this.alquileresCompletadosTotales;
    }

    /** @returns Matrícula del vehículo. */
    public getNumeroMatricula(): string {
        return this.numeroMatricula;
    }

    /** @returns Cantidad total de alquileres completados. (Alias) */
    public getCantidadTotalAlquileres(): number {
        return this.alquileresCompletadosTotales;
    }  

   
    /**
     * Cambia el estado del vehículo (patrón State).
     *
     * @param estado Nuevo estado.
     */
    public setEstado(estado: IVehiculoEstado): void {
        this.estado = estado;
        this.estado.setContexto(this);
    }

    /** @returns 'true' si el vehículo está alquilado. */
    public estaEnAlquiler(): boolean {
        return this.estado.estaEnAlquiler();
    }

    /** @returns 'true' si el vehículo está disponible. */
    public estaDisponible(): boolean {
        return this.estado.estaDisponible();
    }

    /** @returns 'true' si el vehículo está en mantenimiento. */
    public estaEnMantenimiento(): boolean {
        return this.estado.estaEnMantenimiento();
    }

    /** Solicita al estado actual que intente alquilar el vehículo. */
    public intentarAlquilar(): void {
        this.estado.alquilar();
    }

    /** Solicita al estado actual que intente devolver el vehículo. */
    public intentarDevolver(): void {
        this.estado.devolver();
    }
 

    /**
     * Calcula el costo final del alquiler del vehículo.
     *
     * Este método debe ser implementado por las subclases (Sedan, Suv, etc.)
     * ya que la fórmula varía según el tipo de vehículo.
     *
     * @param kilometrajeTotal Kilómetros recorridos durante el alquiler.
     * @param diasReservados Cantidad total de días reservados.
     * @param temporada Objeto que define el factor de ajuste aplicado.
     * @returns Costo total del alquiler.
     */
    public abstract calcularCostoFinal(
        kilometrajeTotal: number,
        diasReservados: number,
        temporada: ITemporada
    ): number;
}
