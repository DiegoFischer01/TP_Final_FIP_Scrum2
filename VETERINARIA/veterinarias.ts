import { generadorID } from "./id";
import { Cliente } from "./cliente";
import { Mascota } from "./mascota";


export class Veterinaria {
    id: number;
    nombre: string;
    direccion: string;
    clientes: Cliente[] = [];
    mascotas: Mascota[] = [];

    constructor(nombre: string, direccion: string, clientes: any[]) {
        this.id = generadorID.generarID();
        this.nombre = nombre;
        this.direccion = direccion;
        this.clientes = clientes;
    }

    agregarCliente(nombre: string, telefono: string, nombresMascotas: { nombre: string, especie: string }[]): void {
        const cliente = new Cliente(nombre, telefono, nombresMascotas);
        this.clientes.push(cliente);
        console.log(`Cliente ${nombre} agregado con ID ${cliente.id}.`);
    }

    modificarCliente(id: number, nombre?: string, telefono?: string): void {
        const cliente = this.clientes.find(c => c.id === id);
        if (cliente) {
            if (nombre) cliente.nombre = nombre;
            if (telefono) cliente.telefono = telefono;
            console.log(`Cliente con ID ${id} modificado.`);
        } else {
            console.log(`Cliente con ID ${id} no encontrado.`);
        }
    }

    eliminarCliente(id: number): void {
        this.clientes = this.clientes.filter(c => c.id !== id);
        console.log(`Cliente con ID ${id} eliminado.`);
    }

    agregarPaciente(nombre: string, especie: string, idDueno: number): void {
        const mascotas = new Mascota(nombre, especie, idDueno);
        this.mascotas.push(mascotas);
        console.log(`Paciente ${nombre} agregado con ID ${mascotas.id}.`);
    }

    modificarPaciente(id: number, nombre?: string, especie?: string): void {
        const paciente = this.mascotas.find(p => p.id === id);
        if (paciente) {
            if (nombre) paciente.nombre = nombre;
            if (especie) paciente.especie = paciente.validarEspecie(especie);
            console.log(`Paciente con ID ${id} modificado.`);
        } else {
            console.log(`Paciente con ID ${id} no encontrado.`);
        }
    }

    eliminarPaciente(id: number, nombre: string): void {
        for (let i = 0; i < this.mascotas.length; i++) {
            if (this.mascotas[i].id === id && this.mascotas[i].nombre === nombre) {
                this.mascotas.splice(i, 1);
                console.log(`Paciente con ID ${id} y nombre ${nombre} eliminado.`);
                return;
            }
        }
        console.log(`Paciente con ID ${id} y nombre ${nombre} no encontrado.`);
    }
}
