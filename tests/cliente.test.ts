import Cliente from "../src/cliente"

describe("Iniciando tests",()=>{
    it("Se instancia correctamente clase Cliente",()=>{
        const cliente01: Cliente= new Cliente(100,"Lopez");
        expect(cliente01).toBeInstanceOf(Cliente);
    })
})
