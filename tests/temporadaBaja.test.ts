import TemporadaBaja from "../src/temporadaBaja";

describe('Tests de TemporadaBaja', () => {
    let temporadaBaja: TemporadaBaja;

    beforeEach(() => {
        temporadaBaja = new TemporadaBaja();
    });

    describe('constructor', () => {
        it('debería crear una instancia de TemporadaBaja correctamente', () => {
            expect(temporadaBaja).toBeInstanceOf(TemporadaBaja);
        });
    });

    describe('obtenerFactorAjuste', () => {
        it('debería devolver el factor de ajuste correcto', () => {
            expect(temporadaBaja.obtenerFactorAjuste()).toBe(0.9);
        });

        it('debería devolver siempre el mismo valor', () => {
            expect(temporadaBaja.obtenerFactorAjuste()).toBe(0.9);
            expect(temporadaBaja.obtenerFactorAjuste()).toBe(0.9);
        });
    });
});
