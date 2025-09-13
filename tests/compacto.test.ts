import Compacto from "../src/compacto";

describe("Arrancando los test", ()=>{
    it("Instanciando compactos",()=>{
        const compacto1: Compacto= new Compacto("GQD895")
        expect(compacto1).toBeInstanceOf(Compacto);
    })
    it("Probando metodo con más de 100km",()=>{
        const compacto1: Compacto= new Compacto("GQD895");
        
        let costo=compacto1.calcularCostoFinal(120,1);

        expect(costo).toEqual(48)
        

    })

    it("Probando metodo con menos de 100 km", ()=>{
        const compacto2: Compacto =new Compacto("AA2932T");
        let costo= compacto2.calcularCostoFinal(95,5);
        expect(costo).toBe(150)
    })
})



