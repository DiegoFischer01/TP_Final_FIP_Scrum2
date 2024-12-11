const readlineSync = require('readline-sync');
import { RedVeterinarias } from './redVeterinaria';
import { RedProveedores } from './proveedores';
import { Veterinaria } from './veterinarias';
import { Cliente } from './cliente';
import { Mascota } from './mascota';

export class InteraccionUsuario {
    private redVeterinarias: RedVeterinarias;
    private redProveedores: RedProveedores;

    constructor() {
        this.redVeterinarias = new RedVeterinarias();
        this.redProveedores = new RedProveedores();
    }

    iniciar(): void {
        this.menuPrincipal();
    }

    menuPrincipal(): void {
        let salir = false;
        while (!salir) {
            console.log('\n--- Menu Principal ---');
            console.log('1. Gestion de Veterinarias');
            console.log('2. Gestion de Proveedores');
            console.log('3. Salir');
            const opcion = readlineSync.question('Seleccione una opcion: ');

            switch (opcion) {
                case '1':
                    this.menuVeterinarias();
                    break;
                case '2':
                    this.menuProveedores();
                    break;
                case '3':
                    salir = true;
                    console.log('Saliendo...');
                    break;
                default:
                    console.log('Opcion no valida. Por favor, intente nuevamente.');
                    break;
            }
        }
    }

    menuVeterinarias(): void {
        let salir = false;
        while (!salir) {
            console.log('\n--- Menu de Veterinarias ---');
            console.log('1. Agregar Veterinaria');
            console.log('2. Modificar Veterinaria');
            console.log('3. Eliminar Veterinaria');
            console.log('4. Mostrar Veterinarias');
            console.log('5. Agregar Cliente a Veterinaria');
            console.log('6. Mostrar Clientes y Mascotas de Veterinaria');
            console.log('7. Registrar Visitas de Cliente');
            console.log('8. Volver al Menu Principal');
            const opcion = readlineSync.question('Seleccione una opcion: ');

            switch (opcion) {
                case '1':
                    const nombre = readlineSync.question('Nombre de la Veterinaria: ');
                    const direccion = readlineSync.question('Direccion de la Veterinaria: ');
                    this.redVeterinarias.agregarVeterinaria(nombre, direccion, []);
                    break;
                case '2':
                    const idModificar = readlineSync.question('ID de la Veterinaria a modificar: ');
                    const nuevoNombre = readlineSync.question('Nuevo nombre (dejar en blanco para no modificar): ');
                    const nuevaDireccion = readlineSync.question('Nueva direccion (dejar en blanco para no modificar): ');
                    this.redVeterinarias.modificarVeterinaria(parseInt(idModificar), nuevoNombre, nuevaDireccion);
                    break;
                case '3':
                    const idEliminar = readlineSync.question('ID de la Veterinaria a eliminar: ');
                    this.redVeterinarias.eliminarVeterinaria(parseInt(idEliminar));
                    break;
                case '4':
                    this.redVeterinarias.mostrarVeterinarias();
                    break;
                case '5':
                    this.agregarClienteAVeterinaria();
                    break;
                case '6':
                    this.mostrarClientesYmascotas();
                    break;
                case '7':
                    this.registrarVisitasDeCliente();
                    break;
                case '8':
                    salir = true;
                    break;
                default:
                    console.log('Opcion no valida. Por favor, intente nuevamente.');
                    break;
            }
        }
    }

    menuProveedores(): void {
        let salir = false;
        while (!salir) {
            console.log('\n--- Menu de Proveedores ---');
            console.log('1. Agregar Proveedor');
            console.log('2. Modificar Proveedor');
            console.log('3. Eliminar Proveedor');
            console.log('4. Mostrar Proveedores');
            console.log('5. Volver al Menu Principal');
            const opcion = readlineSync.question('Seleccione una opcion: ');

            switch (opcion) {
                case '1':
                    const nombre = readlineSync.question('Nombre del Proveedor: ');
                    const telefono = readlineSync.question('Telefono del Proveedor: ');
                    this.redProveedores.agregarProveedor(nombre, telefono);
                    break;
                case '2':
                    const idModificar = readlineSync.question('ID del Proveedor a modificar: ');
                    const nuevoNombre = readlineSync.question('Nuevo nombre (dejar en blanco para no modificar): ');
                    const nuevoTelefono = readlineSync.question('Nuevo telefono (dejar en blanco para no modificar): ');
                    this.redProveedores.modificarProveedor(parseInt(idModificar), nuevoNombre, nuevoTelefono);
                    break;
                case '3':
                    const idEliminar = readlineSync.question('ID del Proveedor a eliminar: ');
                    this.redProveedores.eliminarProveedor(parseInt(idEliminar));
                    break;
                case '4':
                    this.redProveedores.mostrarProveedores();
                    break;
                case '5':
                    salir = true;
                    break;
                default:
                    console.log('Opcion no valida. Por favor, intente nuevamente.');
                    break;
            }
        }
    }

    agregarClienteAVeterinaria(): void {
        const idVet = readlineSync.question('ID de la Veterinaria: ');
        const veterinaria = this.redVeterinarias.getVeterinarias().find(vet => vet.id === parseInt(idVet));
        if (veterinaria) {
            const nombreCliente = readlineSync.question('Nombre del Cliente: ');
            const telefonoCliente = readlineSync.question('Telefono del Cliente: ');
            const mascotasCliente: { nombre: string, especie: string }[] = [];
            let agregarMascotas = true;
            while (agregarMascotas) {
                const nombreMascota = readlineSync.question('Nombre de la Mascota: ');
                const especieMascota = readlineSync.question('Especie de la Mascota: ');
                if (nombreMascota.trim() !== "" && especieMascota.trim() !== "") {
                    mascotasCliente.push({ nombre: nombreMascota, especie: especieMascota });
                } else {
                    console.log('Nombre y Especie no pueden estar vacios.');
                }
                const respuesta = readlineSync.question('¿Agregar otra mascota? (s/n): ').toLowerCase();
                agregarMascotas = ["s", "si", "y", "yes"].includes(respuesta);
            }
            veterinaria.agregarCliente(nombreCliente, telefonoCliente, mascotasCliente);
        } else {
            console.log('Veterinaria no encontrada.');
        }
    }

    mostrarClientesYmascotas(): void {
        const idVet = readlineSync.question('ID de la Veterinaria: ');
        const veterinaria = this.redVeterinarias.getVeterinarias().find(vet => vet.id === parseInt(idVet));
        if (veterinaria) {
            console.log(`\n--- Lista de Clientes y sus Mascotas de la Veterinaria ${veterinaria.nombre} ---`);
            veterinaria.clientes.forEach(cliente => {
                console.log(`Cliente: ${cliente.nombre} (ID: ${cliente.id}, Telefono: ${cliente.telefono}, Visitas: ${cliente.visitas}, VIP: ${cliente.vip})`);
                cliente.mascotas.forEach(mascota => {
                    console.log(`  Mascota: ${mascota.nombre} (${mascota.especie}), ID: ${mascota.id}`);
                });
            });
        } else {
            console.log('Veterinaria no encontrada.');
        }
    }

    registrarVisitasDeCliente(): void {
        const idVet = readlineSync.question('ID de la Veterinaria: ');
        const veterinaria = this.redVeterinarias.getVeterinarias().find(vet => vet.id === parseInt(idVet));
        if (veterinaria) {
            const idCliente = readlineSync.question('ID del Cliente: ');
            const cliente = veterinaria.clientes.find(c => c.id === parseInt(idCliente));
            if (cliente) {
                cliente.incrementarVisitas();
                console.log(`Visitas incrementadas. Total visitas: ${cliente.visitas}. VIP: ${cliente.vip}`);
            } else {
                console.log('Cliente no encontrado.');
            }
        } else {
            console.log('Veterinaria no encontrada.');
        }
    }
}

const app = new InteraccionUsuario();
app.iniciar();
