import EstadoDisponible from "../src/estadoDisponible";
import EstadoEnAlquiler from "../src/estadoEnAlquiler";
import Vehiculo from "../src/vehiculo";


describe('EstadoEnAlquiler', () => {
    let estado: EstadoEnAlquiler;
    
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        estado = new EstadoEnAlquiler();

        mockVehiculo = {
            setEstado: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        estado.setContexto(mockVehiculo);
    });

    describe('transiciones válidas', () => {
        it('debería cambiar el estado a EstadoDisponible al devolver el vehículo', () => {
            estado.devolver();
            expect(mockVehiculo.setEstado).toHaveBeenCalledTimes(1);
            expect(mockVehiculo.setEstado).toHaveBeenCalledWith(expect.any(EstadoDisponible));
        });
    });

    describe('operaciones inválidas', () => {
        it('debería lanzar un error al intentar alquilar un vehículo ya en alquiler', () => {
            try {
                estado.alquilar();
            } catch (error) {
                expect((error as Error).message).toBe('El vehiculo ya esta en alquiler');
            }
        });

        it('debería lanzar un error al intentar iniciar mantenimiento sin devolver antes', () => {
            try {
                estado.iniciarMantenimiento();
            } catch (error) {
                expect((error as Error).message).toBe('El vehiculo debe ser devuelto primero');
            }
        });

        it('debería lanzar un error al intentar finalizar mantenimiento estando en alquiler', () => {
            try {
                estado.finalizarMantenimiento();
            } catch (error) {
                expect((error as Error).message).toBe(
                    'No se puede finalizar el mantenimiento de un vehiculo que esta en alquiler'
                );
            }
        });
    });

    describe('consultas de estado', () => {
        it('debería retornar el nombre correcto del estado', () => {
            expect(estado.getNombre()).toBe('En alquiler');
        });

        it('debería indicar que el vehículo no está disponible', () => {
            expect(estado.estaDisponible()).toBe(false);
        });

        it('debería indicar que el vehículo está en alquiler', () => {
            expect(estado.estaEnAlquiler()).toBe(true);
        });

        it('debería indicar que el vehículo no está en mantenimiento', () => {
            expect(estado.estaEnMantenimiento()).toBe(false);
        });
    });
});
