/**
 * Representa a un cliente dentro del sistema.
 * Cada cliente posee un identificador único y un nombre asociado.
 */
export default class Cliente {
    private id: number;
    private nombre: string;

    /**
     * Crea una nueva instancia de Cliente.
     * @param id - Identificador único del cliente.
     * @param nombre - Nombre del cliente.  
     */
    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }

    /**
     * Obtiene el identificador único del cliente.
     * @returns El ID del cliente.
     */
    public getID(): number {
        return this.id;
    }

    /**
     * Obtiene el nombre registrado del cliente.
     * @returns El nombre del cliente.
     */
    public getNombre(): string {
        return this.nombre;
    }
}
