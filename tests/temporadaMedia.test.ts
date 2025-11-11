import TemporadaMedia from "../src/temporadaMedia";

describe('Tests de TemporadaMedia', () => {
    let temporadaMedia: TemporadaMedia;

    beforeEach(() => {
        temporadaMedia = new TemporadaMedia();
    });

    describe('constructor', () => {
        it('debería crear una instancia de TemporadaMedia correctamente', () => {
            expect(temporadaMedia).toBeInstanceOf(TemporadaMedia);
        });
    });

    describe('obtenerFactorAjuste', () => {
        it('debería devolver el factor de ajuste correcto', () => {
            expect(temporadaMedia.obtenerFactorAjuste()).toBe(1);
        });

        it('debería devolver siempre el mismo valor', () => {
            expect(temporadaMedia.obtenerFactorAjuste()).toBe(1);
            expect(temporadaMedia.obtenerFactorAjuste()).toBe(1);
        });
    });
});
