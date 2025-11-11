import Cliente from "../src/cliente";

describe('Test de Cliente', () => {
    let cliente: Cliente;
    const id = 1;
    const nombre = 'cliente1';

    beforeEach(() => {
        cliente = new Cliente(id, nombre);
    });

    describe('constructor', () => {
        it('debería crear una instancia de Cliente correctamente', () => {
            expect(cliente).toBeInstanceOf(Cliente);
        });
    });

    describe('getID', () => {
        it('debería devolver el id correcto', () => {
            expect(cliente.getID()).toBe(1);
        });

        it('debería devolver el id correcto para otro cliente', () => {
            const otroCliente = new Cliente(99, 'cliente2');
            expect(otroCliente.getID()).toBe(99);
        });
    });

    describe('getNombre', () => {
        it('debería devolver el nombre correcto', () => {
            expect(cliente.getNombre()).toBe('cliente1');
        });

        it('debería devolver el nombre correcto para otro cliente', () => {
            const otroCliente = new Cliente(2, 'cliente3');
            expect(otroCliente.getNombre()).toBe('cliente3');
        });
    });
});