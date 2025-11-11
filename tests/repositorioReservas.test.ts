import RepositorioReservas from "../src/repositorioReservas";
import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import Vehiculo from "../src/vehiculo";
import ITemporada from "../src/iTemporada";

jest.mock('../src/reserva');

describe('RepositorioReservas', () => {
    let repositorio: RepositorioReservas;
    let mockCliente: jest.Mocked<Cliente>;
    let mockVehiculo: jest.Mocked<Vehiculo>;
    let mockTemporada: jest.Mocked<ITemporada>;
    let mockReserva: jest.Mocked<Reserva>;

    const fechaInicio = new Date(2025, 0, 1);
    const fechaFin = new Date(2025, 0, 10);

    beforeEach(() => {

        jest.resetModules();
        jest.clearAllMocks();


        mockReserva = {
            getId: jest.fn().mockReturnValue(1),
            getFechaInicio: jest.fn().mockReturnValue(fechaInicio),
            getFechaFin: jest.fn().mockReturnValue(fechaFin),
        } as unknown as jest.Mocked<Reserva>;

        repositorio = new RepositorioReservas();

        mockCliente = {
            getID: jest.fn().mockReturnValue(1),
            getNombre: jest.fn().mockReturnValue("cliente1"),
        } as unknown as jest.Mocked<Cliente>;

        mockVehiculo = {
            getNumeroMatricula: jest.fn().mockReturnValue("ABC123"),
        } as unknown as jest.Mocked<Vehiculo>;

        mockTemporada = {
            obtenerFactorAjuste: jest.fn().mockReturnValue(1.0),
        } as unknown as jest.Mocked<ITemporada>;

        (Reserva as unknown as jest.Mock).mockImplementation(() => mockReserva);
    });

    describe('Inicialización', () => {
        it('debería iniciar con los listados vacíos y siguienteId en 1', () => {
            expect(repositorio['reservas'].size).toBe(0);
            expect(repositorio['historialReservas'].size).toBe(0);
            expect(repositorio['siguienteId']).toBe(1);
        });
    });

    describe('Agregar reservas', () => {
        it('debería agregar una reserva correctamente y aumentar el ID', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);

            expect(Reserva).toHaveBeenCalledWith(1, mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            expect(repositorio['reservas'].size).toBe(1);
            expect(repositorio['historialReservas'].size).toBe(1);
            expect(repositorio['siguienteId']).toBe(2);
        });
    });

    describe('Eliminar reservas', () => {
        it('debería eliminar una reserva existente correctamente', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            repositorio.eliminarReserva(mockReserva);
            expect(repositorio['reservas'].size).toBe(0);
        });

        it('debería lanzar error si intenta eliminar una reserva inexistente', () => {
            try {
                repositorio.eliminarReserva(mockReserva);
            } catch (error) {
                expect((error as Error).message).toBe("reserva no encontrada");
            }
        });
    });

    describe('Obtener reserva por ID', () => {
        it('debería devolver la reserva correspondiente', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const encontrada = repositorio.obtenerReservaPorId(1);
            expect(encontrada).toBe(mockReserva);
        });

        it('debería devolver undefined si no existe la reserva', () => {
            const inexistente = repositorio.obtenerReservaPorId(99);
            expect(inexistente).toBeUndefined();
        });
    });

    describe('Obtener reservas en conflicto', () => {
        it('debería devolver reservas en conflicto de fechas', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const conflictos = repositorio.obtenerReservasEnConflicto(
                new Date(2025, 0, 5),
                new Date(2025, 0, 15)
            );
            expect(conflictos.length).toBe(1);
            expect(conflictos[0]).toBe(mockReserva);
        });

        it('debería devolver vacío si no hay conflicto', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const conflictos = repositorio.obtenerReservasEnConflicto(
                new Date(2025, 0, 11),
                new Date(2025, 0, 20)
            );
            expect(conflictos.length).toBe(0);
        });
    });

    describe('Obtener reservas por periodo', () => {
        it('debería devolver las reservas dentro del periodo indicado', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const resultado = repositorio.obtenerReservasPorPeriodo(
                new Date(2024, 11, 25),
                new Date(2025, 0, 15)
            );
            expect(resultado.length).toBe(1);
            expect(resultado[0]).toBe(mockReserva);
        });

        it('debería devolver vacío si ninguna reserva cae en el periodo', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const resultado = repositorio.obtenerReservasPorPeriodo(
                new Date(2026, 0, 1),
                new Date(2026, 0, 10)
            );
            expect(resultado.length).toBe(0);
        });
    });

    describe('Obtener todas las reservas', () => {
        it('debería devolver todas las reservas activas', () => {
            repositorio.agregarReserva(mockCliente, mockVehiculo, fechaInicio, fechaFin, mockTemporada);
            const todas = repositorio.obtenerTodas();
            expect(todas.length).toBe(1);
            expect(todas[0]).toBe(mockReserva);
        });
    });
});
