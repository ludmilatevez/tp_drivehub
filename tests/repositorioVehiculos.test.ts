import RepositorioVehiculos from "../src/repositorioVehiculos";
import Vehiculo from "../src/vehiculo";

describe('RepositorioVehiculos', () => {
    let repositorio: RepositorioVehiculos;
    let mockVehiculo: jest.Mocked<Vehiculo>;

    beforeEach(() => {
        repositorio = new RepositorioVehiculos();

        mockVehiculo = {
            getNumeroMatricula: jest.fn().mockReturnValue('ABC123'),
        } as unknown as jest.Mocked<Vehiculo>;
    });

    describe('Inicialización', () => {
        it('debería crear el repositorio vacío', () => {
            const todos = repositorio.obtenerTodos();
            expect(todos.length).toBe(0);
        });
    });

    describe('Agregar y obtener vehículos', () => {
        it('debería agregar un vehículo y recuperarlo por matrícula', () => {
            repositorio.agregarVehiculo(mockVehiculo);
            const vehiculoObtenido = repositorio.obtenerPorMatricula('ABC123');
            expect(vehiculoObtenido).toBe(mockVehiculo);
        });

        it('debería devolver undefined si no existe el vehículo buscado', () => {
            const vehiculo = repositorio.obtenerPorMatricula('ZZZ999');
            expect(vehiculo).toBeUndefined();
        });
    });

    describe('Obtener todos los vehículos', () => {
        it('debería devolver todos los vehículos agregados', () => {
            const mockVehiculo2 = {
                getNumeroMatricula: jest.fn().mockReturnValue('DEF456'),
            } as unknown as jest.Mocked<Vehiculo>;

            repositorio.agregarVehiculo(mockVehiculo);
            repositorio.agregarVehiculo(mockVehiculo2);

            const vehiculos = repositorio.obtenerTodos();
            expect(vehiculos.length).toBe(2);
            expect(vehiculos).toContain(mockVehiculo);
            expect(vehiculos).toContain(mockVehiculo2);
        });
    });

    describe('Eliminar vehículos', () => {
        it('debería eliminar un vehículo por matrícula correctamente', () => {
            repositorio.agregarVehiculo(mockVehiculo);
            repositorio.eliminarPorMatricula('ABC123');

            const vehiculos = repositorio.obtenerTodos();
            expect(vehiculos.length).toBe(0);
        });

        it('debería lanzar un error si el vehículo no existe al intentar eliminarlo', () => {
            try {
                repositorio.eliminarPorMatricula('AAA111');
            } catch (error) {
                expect((error as Error).message).toBe('vehiculo no encontrado');
            }
        });
    });
});
