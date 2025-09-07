import Cliente from "./cliente";
import Vehiculo from "./vehiculo";

export default class Reserva
{

    private cliente:Cliente;
    private vehiculo:Vehiculo;
    private fechaInicio:Date;
    private fechaFin:Date;
    
    constructor(cliente:Cliente,vehiculo:Vehiculo,fechaInicio:Date,fechaFin:Date)
    {
        this.cliente=cliente;
        this.vehiculo=vehiculo;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;
    }

    public getFechaInicio():Date
    {
        return this.fechaInicio;
    }

    public getFechaFin():Date
    {
        return this.fechaFin;
    }

    public getVehiculo():Vehiculo
    {
        return this.vehiculo;
    }

    public getCliente():Cliente
    {
        return this.cliente;
    }

}