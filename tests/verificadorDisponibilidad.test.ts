import VerificadorDisponibilidad from "../src/verificadorDisponibilidad";
import RepositorioVehiculos from "../src/repositorioVehiculos";
import RepositorioReservas from "../src/repositorioReservas";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/reserva";

describe("VerificadorDisponibilidad", () => {
    let mockRepoVehiculos: jest.Mocked<RepositorioVehiculos>;
    let mockRepoReservas: jest.Mocked<RepositorioReservas>;
    let verificador: VerificadorDisponibilidad;
    let mockVehiculo: jest.Mocked<Vehiculo>;
    let mockReserva: jest.Mocked<Reserva>;

    const fechaInicio = new Date(2025, 1, 1);
    const fechaFin = new Date(2025, 1, 10);

    beforeEach(() => {
        mockRepoVehiculos = {
            obtenerPorMatricula: jest.fn(),
        } as unknown as jest.Mocked<RepositorioVehiculos>;

        mockRepoReservas = {
            obtenerReservasEnConflicto: jest.fn(),
        } as unknown as jest.Mocked<RepositorioReservas>;

        mockVehiculo = {
            getNumeroMatricula: jest.fn().mockReturnValue("ABC123"),
            estaDisponible: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        mockReserva = {
            getVehiculo: jest.fn(),
        } as unknown as jest.Mocked<Reserva>;

        verificador = new VerificadorDisponibilidad(mockRepoVehiculos, mockRepoReservas);
    });

    describe("estaDisponible", () => {
        it("debería devolver false si el vehículo no está en el repositorio", () => {
            mockRepoVehiculos.obtenerPorMatricula.mockReturnValue(undefined);

            const resultado = verificador.estaDisponible(mockVehiculo, fechaInicio, fechaFin);
            expect(resultado).toBe(false);
        });

        it("debería devolver false si el vehículo está en el repositorio pero no está disponible", () => {
            mockVehiculo.estaDisponible.mockReturnValue(false);
            mockRepoVehiculos.obtenerPorMatricula.mockReturnValue(mockVehiculo);

            const resultado = verificador.estaDisponible(mockVehiculo, fechaInicio, fechaFin);
            expect(resultado).toBe(false);
        });

        it("debería devolver false si hay una reserva en conflicto para el mismo vehículo", () => {
            mockVehiculo.estaDisponible.mockReturnValue(true);
            mockRepoVehiculos.obtenerPorMatricula.mockReturnValue(mockVehiculo);

            const reservaConflicto = {
                getVehiculo: jest.fn().mockReturnValue({
                    getNumeroMatricula: jest.fn().mockReturnValue("ABC123"),
                }),
            } as unknown as jest.Mocked<Reserva>;

            mockRepoReservas.obtenerReservasEnConflicto.mockReturnValue([reservaConflicto]);

            const resultado = verificador.estaDisponible(mockVehiculo, fechaInicio, fechaFin);
            expect(resultado).toBe(false);
        });

        it("debería devolver true si no hay reservas en conflicto y el vehículo está disponible", () => {
            mockVehiculo.estaDisponible.mockReturnValue(true);
            mockRepoVehiculos.obtenerPorMatricula.mockReturnValue(mockVehiculo);
            mockRepoReservas.obtenerReservasEnConflicto.mockReturnValue([]);

            const resultado = verificador.estaDisponible(mockVehiculo, fechaInicio, fechaFin);
            expect(resultado).toBe(true);
        });

        it("debería devolver true si hay reservas pero ninguna con la misma matrícula", () => {
            mockVehiculo.estaDisponible.mockReturnValue(true);
            mockRepoVehiculos.obtenerPorMatricula.mockReturnValue(mockVehiculo);

            const reservaNoConflicto = {
                getVehiculo: jest.fn().mockReturnValue({
                    getNumeroMatricula: jest.fn().mockReturnValue("XYZ999"),
                }),
            } as unknown as jest.Mocked<Reserva>;

            mockRepoReservas.obtenerReservasEnConflicto.mockReturnValue([reservaNoConflicto]);

            const resultado = verificador.estaDisponible(mockVehiculo, fechaInicio, fechaFin);
            expect(resultado).toBe(true);
        });
    });


});
