import { generadorID } from './id';


export class Proveedores {
    id: number;
    nombre: string;
    telefono: string;

    constructor (nombre: string, telefono: string) {
      this.id = generadorID.generarID();
        this.nombre = nombre;
        this.telefono = telefono;
    }
}


export class RedProveedores {
    private proveedores: Proveedores[] = [];

    agregarProveedor(nombre: string, telefono: string): void {
        const proveedor = new Proveedores(nombre, telefono);
        this.proveedores.push(proveedor);
        console.log(`Proveedor ${nombre} agregado con ID ${proveedor.id}.`);
    }

    modificarProveedor(id: number, nombre?: string, telefono?: string): void {
        const proveedor = this.proveedores.find(p => p.id === id);
        if (proveedor) {
            if (nombre) proveedor.nombre = nombre;
            if (telefono) proveedor.telefono = telefono;
            console.log(`Proveedor con ID ${id} modificado.`);
        } else {
            console.log(`Proveedor con ID ${id} no encontrado.`);
        }
    }

    eliminarProveedor(id: number): void {
        this.proveedores = this.proveedores.filter(p => p.id !== id);
        console.log(`Proveedor con ID ${id} eliminado.`);
    }

    mostrarProveedores(): void {
        console.log('\n--- Lista de Proveedores ---');
        this.proveedores.forEach(p => {
            console.log(`ID: ${p.id}, Nombre: ${p.nombre}, Teléfono: ${p.telefono}`);
        });
    }
}
