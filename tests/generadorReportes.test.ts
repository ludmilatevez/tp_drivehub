import GeneradorReportes from "../src/generadorReportes";
import RepositorioVehiculos from "../src/repositorioVehiculos";
import RepositorioReservas from "../src/repositorioReservas";
import Vehiculo from "../src/vehiculo";
import Reserva from "../src/reserva";

describe('GeneradorReportes', () => {
    let mockRepoVehiculos: jest.Mocked<RepositorioVehiculos>;
    let mockRepoReservas: jest.Mocked<RepositorioReservas>;
    let generador: GeneradorReportes;
    let mockConsoleLog: jest.SpyInstance;

    beforeEach(() => {
        mockRepoVehiculos = {
            obtenerTodos: jest.fn(),
        } as unknown as jest.Mocked<RepositorioVehiculos>;

        mockRepoReservas = {
            obtenerReservasPorPeriodo: jest.fn(),
        } as unknown as jest.Mocked<RepositorioReservas>;

        generador = new GeneradorReportes(mockRepoVehiculos, mockRepoReservas);

        mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('vehiculosMasYMenosAlquilados', () => {
        it('debería mostrar mensaje si no hay reservas en el periodo', () => {
            mockRepoReservas.obtenerReservasPorPeriodo.mockReturnValue([]);

            generador.vehiculosMasYMenosAlquilados(new Date(), new Date());

            expect(mockConsoleLog).toHaveBeenCalledWith("en este periodo de tiempo no hubo reservas");
        });

        it('debería mostrar correctamente los vehículos más y menos alquilados', () => {
            const mockVehiculo1 = {
                getNumeroMatricula: jest.fn().mockReturnValue("AAA111"),
                getCantidadTotalAlquileres: jest.fn().mockReturnValue(5),
            } as unknown as jest.Mocked<Vehiculo>;

            const mockVehiculo2 = {
                getNumeroMatricula: jest.fn().mockReturnValue("BBB222"),
                getCantidadTotalAlquileres: jest.fn().mockReturnValue(2),
            } as unknown as jest.Mocked<Vehiculo>;

            const mockReserva1 = {
                getVehiculo: jest.fn().mockReturnValue(mockVehiculo1),
            } as unknown as jest.Mocked<Reserva>;

            const mockReserva2 = {
                getVehiculo: jest.fn().mockReturnValue(mockVehiculo2),
            } as unknown as jest.Mocked<Reserva>;

            mockRepoReservas.obtenerReservasPorPeriodo.mockReturnValue([mockReserva1, mockReserva2]);

            generador.vehiculosMasYMenosAlquilados(new Date(), new Date());

            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            const mensaje = mockConsoleLog.mock.calls[0][0];
            expect(mensaje).toContain("vehiculo mas alquilado tiene matricula: AAA111");
            expect(mensaje).toContain("vehiculo menos alquilado tiene matricula: BBB222");
        });
    });


    describe('vehiculosConMasYMenosRentabilidad', () => {
        it('debería mostrar mensaje si no hay vehículos', () => {
            mockRepoVehiculos.obtenerTodos.mockReturnValue([]);

            generador.vehiculosConMasYMenosRentabilidad();

            expect(mockConsoleLog).toHaveBeenCalledWith("aun no fue reservado ningun vehiculo");
        });

        it('debería mostrar el vehículo con más y menos rentabilidad', () => {
            const mockVehiculo1 = {
                getRentabilidad: jest.fn().mockReturnValue(1000),
                getNumeroMatricula: jest.fn().mockReturnValue("AAA111"),
            } as unknown as jest.Mocked<Vehiculo>;

            const mockVehiculo2 = {
                getRentabilidad: jest.fn().mockReturnValue(200),
                getNumeroMatricula: jest.fn().mockReturnValue("BBB222"),
            } as unknown as jest.Mocked<Vehiculo>;

            mockRepoVehiculos.obtenerTodos.mockReturnValue([mockVehiculo1, mockVehiculo2]);

            generador.vehiculosConMasYMenosRentabilidad();

            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            const mensaje = mockConsoleLog.mock.calls[0][0];
            expect(mensaje).toContain("vehiculo con mas rentabilidad tiene matricula: AAA111");
            expect(mensaje).toContain("vehiculo con menos rentabilidad tiene matricula: BBB222");
        });
    });


    describe('calcularOcupacionDeFlota', () => {
        it('debería calcular correctamente la ocupación', () => {
            const mockVehiculo1 = {
                estaEnAlquiler: jest.fn().mockReturnValue(true),
            } as unknown as jest.Mocked<Vehiculo>;

            const mockVehiculo2 = {
                estaEnAlquiler: jest.fn().mockReturnValue(false),
            } as unknown as jest.Mocked<Vehiculo>;

            mockRepoVehiculos.obtenerTodos.mockReturnValue([mockVehiculo1, mockVehiculo2]);

            generador.calcularOcupacionDeFlota();

            expect(mockConsoleLog).toHaveBeenCalledTimes(1);
            const mensaje = mockConsoleLog.mock.calls[0][0];
            expect(mensaje).toContain("la ocupacion de la flota es del: 50");
        });
    });
});
