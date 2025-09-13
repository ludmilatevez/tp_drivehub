import Sedan from "../src/sedan";

describe("Iniciando test para sedan", ()=>{
    it("Instanciando sedan",()=>{
        const sedan: Sedan = new Sedan("JRS852");
        expect(sedan).toBeInstanceOf(Sedan);
    })

    it("Probando metodo", ()=>{
        const sedan: Sedan = new Sedan("JRS852");
        let costo=sedan.calcularCostoFinal(150,1);
        expect(costo).toEqual(80)
    })

})
