import Suv from "../src/suv";

describe("Iniciando test para suv", ()=>{
    it("Instanciando suv",()=>{
        const suv: Suv = new Suv("TSE414");
        expect(suv).toBeInstanceOf(Suv);
    })

    it("Probando metodo con más de 500k",()=>{
        const suv: Suv= new Suv("TSE414");
                let costo=suv.calcularCostoFinal(300,2);
                expect(costo).toEqual(340);
    })

    it("Probando metodo con menos de 500k",()=>{
        const suv2: Suv= new Suv("UYR423");
                let costo=suv2.calcularCostoFinal(100,2);
                expect(costo).toBe(190);
    })

})
