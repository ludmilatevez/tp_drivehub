import CalculadoraDuracion from "../src/calculadoraDuracion";
import Compacto from "../src/compacto";
import ITemporada from "../src/iTemporada";
import IVehiculoEstado from "../src/iVehiculoEstado";

jest.mock('../src/calculadoraDuracion');

describe('Compacto', () => {
    let vehiculo: Compacto;
    let mockEstado: jest.Mocked<IVehiculoEstado>;
    let mockTemporada: jest.Mocked<ITemporada>;

    beforeEach(() => {
        vehiculo = new Compacto('ABC123');
        mockEstado = {
            setContexto: jest.fn(),
            alquilar: jest.fn(),
            devolver: jest.fn(),
            iniciarMantenimiento: jest.fn(),
            finalizarMantenimiento: jest.fn(),
            getNombre: jest.fn().mockReturnValue('MockEstado'),
            estaDisponible: jest.fn().mockReturnValue(true),
            estaEnAlquiler: jest.fn().mockReturnValue(false),
            estaEnMantenimiento: jest.fn().mockReturnValue(false),
        };

        mockTemporada = {
            obtenerFactorAjuste: jest.fn().mockReturnValue(1.0),
        } as unknown as jest.Mocked<ITemporada>;
    });

    describe('Inicialización', () => {
        it('debería crear un vehículo con los valores iniciales correctos', () => {
            expect(vehiculo.getNumeroMatricula()).toBe('ABC123');
            expect(vehiculo.getCostoMantenimiento()).toBe(20);
            expect(vehiculo.getRentabilidad()).toBe(0);
            expect(vehiculo.getKmDesdeElUltimoMantenimiento()).toBe(0);
            expect(vehiculo.getAlquileresCompletados()).toBe(0);
            expect(vehiculo.getCantidadTotalAlquileres()).toBe(0);
            expect(vehiculo.estaDisponible()).toBe(true);
            expect(vehiculo.estaEnAlquiler()).toBe(false);
            expect(vehiculo.estaEnMantenimiento()).toBe(false);
        });
    });

    describe('Gestión de rentabilidad', () => {
        it('debería aumentar la rentabilidad correctamente', () => {
            vehiculo.aumentarRentabilidad(100);
            expect(vehiculo.getRentabilidad()).toBe(100);
        });

        it('debería disminuir la rentabilidad correctamente', () => {
            vehiculo.aumentarRentabilidad(200);
            vehiculo.disminuirRentabilidad(50);
            expect(vehiculo.getRentabilidad()).toBe(150);
        });
    });

    describe('Gestión de mantenimiento', () => {
        it('debería requerir mantenimiento luego de 5 alquileres', () => {
            expect(vehiculo.necesitaMantenimientoPorAlquileres()).toBe(false);
            for (let i = 0; i < 5; i++) {
                vehiculo.incrementarAlquileres();
            } 
            expect(vehiculo.necesitaMantenimientoPorAlquileres()).toBe(true);
        });

        it('debería requerir mantenimiento por km luego de superar 10000', () => {
            expect(vehiculo.necesitaMantenimientoPorKm()).toBe(false);
            vehiculo.actualizarKilometros(10500);
            expect(vehiculo.necesitaMantenimientoPorKm()).toBe(true);
        });

        it('debería requerir mantenimiento por tiempo luego de 12 meses', () => {
            const fechaInicio = vehiculo.getFechaUltimoMantenimiento();
            const fechaFin = new Date(fechaInicio);
            fechaFin.setMonth(fechaFin.getMonth() + 13);

            (CalculadoraDuracion.calcularDuracionEnMeses as jest.Mock).mockReturnValue(13);

            expect(vehiculo.necesitaMantenimientoPorTiempo(fechaFin)).toBe(true);
        });
    });

    describe('Gestión de estado', () => {
        it('debería poder cambiar de estado correctamente', () => {
            vehiculo.setEstado(mockEstado);
            expect(mockEstado.setContexto).toHaveBeenCalledWith(vehiculo);
        });

        it('debería delegar en el estado actual al intentar alquilar', () => {
            vehiculo.setEstado(mockEstado);
            vehiculo.intentarAlquilar();
            expect(mockEstado.alquilar).toHaveBeenCalled();
        });

        it('debería delegar en el estado actual al intentar devolver', () => {
            vehiculo.setEstado(mockEstado);
            vehiculo.intentarDevolver();
            expect(mockEstado.devolver).toHaveBeenCalled();
        });
    });

    describe('Cálculo de costo final', () => {
        it('debería calcular correctamente el costo sin adicional (menos de 100 km/día)', () => {
            mockTemporada.obtenerFactorAjuste.mockReturnValue(1.2);
            const costo = vehiculo.calcularCostoFinal(500, 10, mockTemporada);
            expect(costo).toBe(360);
        });

        it('debería calcular correctamente el costo con adicional (más de 100 km/día)', () => {
            mockTemporada.obtenerFactorAjuste.mockReturnValue(1);
            const costo = vehiculo.calcularCostoFinal(1200, 10, mockTemporada);
 
            expect(costo).toBe(480);
        });
    });
});