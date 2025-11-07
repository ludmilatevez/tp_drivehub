import Cliente from "./cliente";
import ITemporada from "./iTemporada";
import Vehiculo from "./vehiculo";

export default class Reserva {
    private id: number;
    private cliente: Cliente;
    private vehiculo: Vehiculo;
    private fechaInicio: Date;
    private fechaFin: Date;

    private temporada: ITemporada;

    constructor(id: number, cliente: Cliente, vehiculo: Vehiculo, fechaInicio: Date, fechaFin: Date, temporada: ITemporada) {
        this.id = id;
        this.cliente = cliente;
        this.vehiculo = vehiculo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.temporada = temporada;
    }

    public getId(): number {
        return this.id;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public getTemporada(): ITemporada {
        return this.temporada;
    }

}