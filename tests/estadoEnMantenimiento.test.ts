import EstadoDisponible from "../src/estadoDisponible";
import EstadoEnMantenimiento from "../src/estadoEnMantenimiento";
import Vehiculo from "../src/vehiculo";


describe('EstadoEnMantenimiento', () => {
    let estado: EstadoEnMantenimiento;
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        estado = new EstadoEnMantenimiento();

        mockVehiculo = {
            setEstado: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        estado.setContexto(mockVehiculo);
    });

    describe('transiciones válidas', () => {
        it('debería cambiar el estado a EstadoDisponible al finalizar mantenimiento', () => {
            estado.finalizarMantenimiento();
            expect(mockVehiculo.setEstado).toHaveBeenCalledTimes(1);
            expect(mockVehiculo.setEstado).toHaveBeenCalledWith(expect.any(EstadoDisponible));
        });
    });

    describe('operaciones inválidas', () => {
        it('debería lanzar un error al intentar alquilar un vehículo en mantenimiento', () => {
            try {
                estado.alquilar();
            } catch (error) {
                expect((error as Error).message).toBe('no se puede alquilar un auto en mantenimiento');
            }
        });

        it('debería lanzar un error al intentar devolver un vehículo en mantenimiento', () => {
            try {
                estado.devolver();
            } catch (error) {
                expect((error as Error).message).toBe('el vehiculo ya fue devuelto y esta en mantenimiento');
            }
        });

        it('debería lanzar un error al intentar iniciar mantenimiento nuevamente', () => {
            try {
                estado.iniciarMantenimiento();
            } catch (error) {
                expect((error as Error).message).toBe('el vehiculo ya esta en mantenimiento');
            }
        });
    });

    describe('consultas de estado', () => {
        it('debería retornar el nombre correcto del estado', () => {
            expect(estado.getNombre()).toBe('En mantenimiento');
        });

        it('debería indicar que el vehículo no está disponible', () => {
            expect(estado.estaDisponible()).toBe(false);
        });

        it('debería indicar que el vehículo no está en alquiler', () => {
            expect(estado.estaEnAlquiler()).toBe(false);
        });

        it('debería indicar que el vehículo está en mantenimiento', () => {
            expect(estado.estaEnMantenimiento()).toBe(true);
        });
    });
});