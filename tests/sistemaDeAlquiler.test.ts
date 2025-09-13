import Cliente from "../src/cliente";
import Compacto from "../src/compacto";
import Reserva from "../src/reserva";
import SistemaDeAlquiler from "../src/sistemaDeAlquiler";
import Vehiculo from "../src/vehiculo";


describe("Arrancando test en el Sistema",()=>{
    let cliente: Cliente;
    let compacto:Compacto;
    let reserva: Reserva;
    let sistema:SistemaDeAlquiler;
    let fechaFin: Date;
    let fechaInicio: Date;

    beforeEach( () => {
        cliente= new Cliente(100,"Carlos");
        compacto= new Compacto("UHX664");
        fechaInicio= new Date(2025,5,18);
        fechaFin= new Date(2025,5,28)
        reserva= new Reserva(cliente,compacto,fechaInicio,fechaFin);
        sistema= new SistemaDeAlquiler()

    })

    it("se instancia correctamente", () => {
        expect(sistema).toBeInstanceOf(SistemaDeAlquiler);
    })

    it("se agrega un vehiculo correctamente", () => {
        
        expect(sistema["vehiculos"].length).toEqual(0);
        sistema.agregarVehiculo(compacto);
        expect(sistema["vehiculos"].length).toEqual(1);
        
    })

    it("Si vehiculo está disponible se crea una reserva",()=>{
        sistema.agregarVehiculo(compacto);
        expect(sistema["reservas"].length).toEqual(0);
        //expect(compacto["estado"]).toEqual("Disponible");
        sistema.crearReserva(cliente,compacto,fechaInicio,fechaFin);
        expect(sistema["reservas"].length).toEqual(1);
        expect(compacto["estado"]).toEqual("En alquiler"); //Se agrega esta linea?
    })

    it("Si vehiculo no está disponible se lanza una excepción",()=>{
        try{
        sistema.crearReserva(cliente,compacto,fechaInicio,fechaFin);
        }
        catch(error){
            expect(error.message).toEqual("el vehiculo solicitado no esta disponible");
        }
    })

    it ("Si se entrega vehiculo correctamente",()=>{
        sistema.agregarVehiculo(compacto);
        sistema.crearReserva(cliente,compacto,fechaInicio,fechaFin);
        expect(sistema["reservas"].length).toEqual(1);
        expect(compacto["estado"]).toEqual("En alquiler");
        sistema.entregarVehiculo(reserva,100);
        expect(compacto["estado"]).toEqual("Disponible");
        expect(sistema["reservas"].length).toEqual(0);
    })
    
})