import SistemaDeAlquiler from "../src/sistemaDeAlquiler";
import RepositorioVehiculos from "../src/repositorioVehiculos";
import RepositorioReservas from "../src/repositorioReservas";
import VerificadorDisponibilidad from "../src/verificadorDisponibilidad";
import EstadoEnMantenimiento from "../src/estadoEnMantenimiento";
import CalculadoraDuracion from "../src/calculadoraDuracion";
import Vehiculo from "../src/vehiculo";
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import ITemporada from "../src/iTemporada";

jest.mock("../src/verificadorDisponibilidad");
jest.mock("../src/estadoEnMantenimiento");
jest.mock("../src/calculadoraDuracion");

describe("SistemaDeAlquiler", () => {
    let mockRepoVehiculos: jest.Mocked<RepositorioVehiculos>;
    let mockRepoReservas: jest.Mocked<RepositorioReservas>;
    let mockVerificador: jest.Mocked<VerificadorDisponibilidad>;
    let sistema: SistemaDeAlquiler;
    let mockVehiculo: jest.Mocked<Vehiculo>;
    let mockCliente: jest.Mocked<Cliente>;
    let mockReserva: jest.Mocked<Reserva>;
    let mockTemporada: jest.Mocked<ITemporada>;

    const fechaInicio = new Date(2025, 1, 1);
    const fechaFin = new Date(2025, 1, 10);

    beforeEach(() => {
        mockRepoVehiculos = {
            agregarVehiculo: jest.fn(),
        } as unknown as jest.Mocked<RepositorioVehiculos>;

        mockRepoReservas = {
            agregarReserva: jest.fn(),
            eliminarReserva: jest.fn(),
        } as unknown as jest.Mocked<RepositorioReservas>;

        mockVerificador = {
            estaDisponible: jest.fn(),
        } as unknown as jest.Mocked<VerificadorDisponibilidad>;

        (VerificadorDisponibilidad as jest.Mock).mockImplementation(() => mockVerificador);

        mockVehiculo = {
            intentarAlquilar: jest.fn(),
            intentarDevolver: jest.fn(),
            actualizarKilometros: jest.fn(),
            incrementarAlquileres: jest.fn(),
            necesitaMantenimientoPorKm: jest.fn(),
            necesitaMantenimientoPorTiempo: jest.fn(),
            necesitaMantenimientoPorAlquileres: jest.fn(),
            setEstado: jest.fn(),
            getCostoMantenimiento: jest.fn(),
            disminuirRentabilidad: jest.fn(),
            calcularCostoFinal: jest.fn(),
            aumentarRentabilidad: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        mockCliente = {} as unknown as jest.Mocked<Cliente>;
        mockTemporada = {} as unknown as jest.Mocked<ITemporada>;

        mockReserva = {
            getVehiculo: jest.fn().mockReturnValue(mockVehiculo),
            getFechaInicio: jest.fn().mockReturnValue(fechaInicio),
            getFechaFin: jest.fn().mockReturnValue(fechaFin),
            getTemporada: jest.fn().mockReturnValue(mockTemporada),
        } as unknown as jest.Mocked<Reserva>;

        sistema = new SistemaDeAlquiler(mockRepoVehiculos, mockRepoReservas);
    });


    describe("agregarVehiculo", () => {
        it("debería agregar un vehículo al repositorio", () => {
            sistema.agregarVehiculo(mockVehiculo);

            expect(mockRepoVehiculos.agregarVehiculo).toHaveBeenCalledWith(mockVehiculo);
        });
    });


    describe("crearReserva", () => {
        it("debería crear una reserva si el vehículo está disponible", () => {
            mockVerificador.estaDisponible.mockReturnValue(true);

            sistema.crearReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);

            expect(mockVerificador.estaDisponible).toHaveBeenCalledWith(mockVehiculo, fechaInicio, fechaFin);
            expect(mockRepoReservas.agregarReserva).toHaveBeenCalledWith(
                mockCliente,
                mockVehiculo,
                fechaInicio,
                fechaFin,
                mockTemporada
            );
            expect(mockVehiculo.intentarAlquilar).toHaveBeenCalled();
        });

        it("debería lanzar un error si el vehículo no está disponible", () => {
            mockVerificador.estaDisponible.mockReturnValue(false);

            try {
                sistema.crearReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            } catch (error) {
                expect((error as Error).message).toBe("el vehiculo solicitado no esta disponible para ser alquilado");
            }
        });
    });

    describe("entregarVehiculo", () => {
        it("debería procesar correctamente la entrega de un vehículo sin mantenimiento", () => {
            mockVehiculo.necesitaMantenimientoPorKm.mockReturnValue(false);
            mockVehiculo.necesitaMantenimientoPorTiempo.mockReturnValue(false);
            mockVehiculo.necesitaMantenimientoPorAlquileres.mockReturnValue(false);
            (CalculadoraDuracion.calcularDuracionEnDias as jest.Mock).mockReturnValue(9);
            mockVehiculo.calcularCostoFinal.mockReturnValue(500);

            sistema.entregarVehiculo(mockReserva, 1200);

            expect(mockVehiculo.intentarDevolver).toHaveBeenCalled();
            expect(mockVehiculo.actualizarKilometros).toHaveBeenCalledWith(1200);
            expect(mockVehiculo.incrementarAlquileres).toHaveBeenCalled();
            expect(mockVehiculo.aumentarRentabilidad).toHaveBeenCalledWith(500);
            expect(mockRepoReservas.eliminarReserva).toHaveBeenCalledWith(mockReserva);
        });

        it("debería aplicar mantenimiento si el vehículo lo necesita", () => {
            mockVehiculo.necesitaMantenimientoPorKm.mockReturnValue(true);
            mockVehiculo.getCostoMantenimiento.mockReturnValue(100);
            (CalculadoraDuracion.calcularDuracionEnDias as jest.Mock).mockReturnValue(9);
            mockVehiculo.calcularCostoFinal.mockReturnValue(500);

            sistema.entregarVehiculo(mockReserva, 2000);

            expect(mockVehiculo.setEstado).toHaveBeenCalledWith(expect.any(EstadoEnMantenimiento));
            expect(mockVehiculo.disminuirRentabilidad).toHaveBeenCalledWith(100);
            expect(mockVehiculo.aumentarRentabilidad).toHaveBeenCalledWith(500);
        });
    });
});
