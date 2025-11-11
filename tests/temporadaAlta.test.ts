import TemporadaAlta from "../src/temporadaAlta";

describe('Tests de TemporadaAlta', () => {
    let temporadaAlta: TemporadaAlta;

    beforeEach(() => {
        temporadaAlta = new TemporadaAlta();
    });

    describe('constructor', () => {
        it('debería crear una instancia de TemporadaAlta correctamente', () => {
            expect(temporadaAlta).toBeInstanceOf(TemporadaAlta);
        });
    });

    describe('obtenerFactorAjuste', () => {
        it('debería devolver el factor de ajuste correcto', () => {
            expect(temporadaAlta.obtenerFactorAjuste()).toBe(1.2);
        });

        it('debería devolver siempre el mismo valor', () => {
            expect(temporadaAlta.obtenerFactorAjuste()).toBe(1.2);
            expect(temporadaAlta.obtenerFactorAjuste()).toBe(1.2);
        });
    });
});
