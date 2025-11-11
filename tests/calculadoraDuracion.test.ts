import CalculadoraDuracion from "../src/calculadoraDuracion";

describe('Tests de CalculadoraDuracion', () => {
    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        fechaInicio = new Date(2023, 0, 1);
        fechaFin = new Date(2023, 0, 11);
    });

    describe('calcularDuracionEnDias', () => {
        it('debería calcular correctamente la duración en días entre dos fechas del mismo mes', () => {
            const resultado = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaFin);
            expect(resultado).toBe(10);
        });

        it('debería devolver 0 si las fechas son iguales', () => {
            const resultado = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaInicio);
            expect(resultado).toBe(0);
        });

        it('debería devolver un número positivo aunque la fecha de inicio es posterior a la de fin', () => {
            const resultado = CalculadoraDuracion.calcularDuracionEnDias(fechaFin, fechaInicio);
            expect(resultado).toBe(10);
        });

        it('debería calcular correctamente la diferencia entre meses distintos', () => {
            fechaInicio = new Date(2023, 0, 31); 
            fechaFin = new Date(2023, 1, 2);
            const resultado = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaFin);
            expect(resultado).toBeCloseTo(2);
        });

        it('debería calcular correctamente cuando hay cambio de año', () => {
            fechaInicio = new Date(2022, 11, 31); 
            fechaFin = new Date(2023, 0, 2);
            const resultado = CalculadoraDuracion.calcularDuracionEnDias(fechaInicio, fechaFin);
            expect(resultado).toBe(2);
        });
    });

    describe('calcularDuracionEnMeses', () => {
        it('debería calcular correctamente los meses entre dos fechas del mismo año', () => {
            fechaInicio = new Date(2023, 0, 1); 
            fechaFin = new Date(2023, 5, 1);
            const resultado = CalculadoraDuracion.calcularDuracionEnMeses(fechaInicio, fechaFin);
            expect(resultado).toBe(5);
        });

        it('debería calcular correctamente los meses entre años distintos', () => {
            fechaInicio = new Date(2022, 11, 1); 
            fechaFin = new Date(2023, 2, 1);
            const resultado = CalculadoraDuracion.calcularDuracionEnMeses(fechaInicio, fechaFin);
            expect(resultado).toBe(3);
        });

        it('debería devolver 0 si las fechas son del mismo mes y año', () => {
            const resultado = CalculadoraDuracion.calcularDuracionEnMeses(fechaInicio, fechaInicio);
            expect(resultado).toBe(0);
        });

        it('debería devolver un número positivo aunque la fecha de inicio es posterior a la de fin', () => {
            fechaInicio = new Date(2023, 8, 1); 
            fechaFin = new Date(2023, 5, 1); 
            const resultado = CalculadoraDuracion.calcularDuracionEnMeses(fechaInicio, fechaFin);
            expect(resultado).toBe(3);
        });

        it('debería manejar correctamente una diferencia de varios años', () => {
            fechaInicio = new Date(2020, 0, 1);
            fechaFin = new Date(2025, 0, 1);
            const resultado = CalculadoraDuracion.calcularDuracionEnMeses(fechaInicio, fechaFin);
            expect(resultado).toBe(60);
        });
    });
});