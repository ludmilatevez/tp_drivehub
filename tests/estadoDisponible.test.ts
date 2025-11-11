import EstadoDisponible from "../src/estadoDisponible";
import EstadoEnAlquiler from "../src/estadoEnAlquiler";
import EstadoEnMantenimiento from "../src/estadoEnMantenimiento";
import Vehiculo from "../src/vehiculo";

describe('EstadoDisponible', () => {
    let estado: EstadoDisponible;
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        estado = new EstadoDisponible();


        mockVehiculo = {
            setEstado: jest.fn(),
        } as unknown as jest.Mocked<Vehiculo>;

        estado.setContexto(mockVehiculo);
    });

    describe('transiciones válidas', () => {
        it('debería cambiar el estado a EstadoEnAlquiler al alquilar', () => {
            estado.alquilar();
            expect(mockVehiculo.setEstado).toHaveBeenCalledTimes(1);
            expect(mockVehiculo.setEstado).toHaveBeenCalledWith(expect.any(EstadoEnAlquiler));
        });

        it('debería cambiar el estado a EstadoEnMantenimiento al iniciar mantenimiento', () => {
            estado.iniciarMantenimiento();
            expect(mockVehiculo.setEstado).toHaveBeenCalledTimes(1);
            expect(mockVehiculo.setEstado).toHaveBeenCalledWith(expect.any(EstadoEnMantenimiento));
        });
    });

    describe('operaciones inválidas', () => {
        it('debería lanzar un error al intentar devolver un vehículo disponible', () => {
            try {
                estado.devolver();
            } catch (error) {
                expect((error as Error).message).toBe(
                    'No se puede devolver un vehiculo que ya esta disponible'
                );
            }
        });

        it('debería lanzar un error al intentar finalizar mantenimiento cuando está disponible', () => {
            try {
                estado.finalizarMantenimiento();
            } catch (error) {
                expect((error as Error).message).toBe(
                    'No se puede finalizar el mantenimiento de un vehiculo que esta disponible'
                );
            }
        });
    });

    describe('consultas de estado', () => {
        it('debería retornar el nombre correcto del estado', () => {
            expect(estado.getNombre()).toBe('Disponible');
        });

        it('debería indicar que el vehículo está disponible', () => {
            expect(estado.estaDisponible()).toBe(true);
        });

        it('debería indicar que el vehículo no está en alquiler', () => {
            expect(estado.estaEnAlquiler()).toBe(false);
        });

        it('debería indicar que el vehículo no está en mantenimiento', () => {
            expect(estado.estaEnMantenimiento()).toBe(false);
        });
    });
});