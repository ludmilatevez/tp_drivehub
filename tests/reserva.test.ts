import Reserva from "../src/reserva";
import Cliente from "../src/cliente";
import Vehiculo from "../src/vehiculo";
import ITemporada from "../src/iTemporada";


const temporadaMock: jest.Mocked<ITemporada> = {
    obtenerFactorAjuste: jest.fn().mockReturnValue(1)
};


const vehiculoMock: jest.Mocked<Vehiculo> = {} as unknown as jest.Mocked<Vehiculo>; 


describe("Tests de Reserva", () => {
    let cliente: Cliente;
    let fechaInicio: Date;
    let fechaFin: Date;
    let reserva: Reserva;

    const id = 1;

    beforeEach(() => {
        cliente = new Cliente(10, "Cliente Test");
        fechaInicio = new Date(2023, 0, 1);
        fechaFin = new Date(2023, 0, 10);

        reserva = new Reserva(id, cliente, vehiculoMock, fechaInicio, fechaFin, temporadaMock);
    });

    describe("constructor", () => {
        it("debería crear una instancia de Reserva correctamente", () => {
            expect(reserva).toBeInstanceOf(Reserva);

            expect(reserva["id"]).toBe(id);
            expect(reserva["cliente"]).toBe(cliente);
            expect(reserva["vehiculo"]).toBe(vehiculoMock);
            expect(reserva["fechaInicio"]).toBe(fechaInicio);
            expect(reserva["fechaFin"]).toBe(fechaFin);
            expect(reserva["temporada"]).toBe(temporadaMock);
        });

        
    });

    describe("getId", () => {
        it("debería devolver el id correcto", () => {
            expect(reserva.getId()).toBe(id);
        });
    });

    describe("getFechaInicio", () => {
        it("debería devolver la fecha de inicio correcta", () => {
            expect(reserva.getFechaInicio()).toBe(fechaInicio);
        });
    });

    describe("getFechaFin", () => {
        it("debería devolver la fecha de fin correcta", () => {
            expect(reserva.getFechaFin()).toBe(fechaFin);
        });
    });

    describe("getVehiculo", () => {
        it("debería devolver el vehículo correcto", () => {
            expect(reserva.getVehiculo()).toBe(vehiculoMock);
        });
    });

    describe("getCliente", () => {
        it("debería devolver el cliente correcto", () => {
            expect(reserva.getCliente()).toBe(cliente);
        });
    });

    describe("getTemporada", () => {
        it("debería devolver la temporada correcta", () => {
            expect(reserva.getTemporada()).toBe(temporadaMock);
        });
    });
});
