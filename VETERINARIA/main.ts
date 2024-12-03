import { RedVeterinarias } from './redVeterinaria'; 
import { Veterinaria } from './veterinarias'; 
import { Cliente } from './cliente'; 
import { Mascota } from './mascota'; 



// Crear instancia de la red de veterinarias
const redVeterinarias = new RedVeterinarias();

// Crear cliente Diego con dos mascotas
const diegoMascotas = [
    { nombre: "Kira", especie: "perro" },
    { nombre: "Ciri", especie: "gato" }
];
const diego = new Cliente("Diego", "123456789", diegoMascotas);

// Registrar la veterinaria PetCare
redVeterinarias.agregarVeterinaria("PetCare", "123 Calle Falsa", []);

// Obtener la veterinaria PetCare
const veterinariaPetCare = redVeterinarias.getVeterinarias().find(vet => vet.nombre === "PetCare");

// Agregar el cliente Diego a la veterinaria PetCare
veterinariaPetCare?.agregarCliente(diego.nombre, diego.telefono, diegoMascotas);

// Mostrar los datos del cliente Diego y sus mascotas
console.log(`Cliente: ${diego.nombre}`);
console.log(`Teléfono: ${diego.telefono}`);
console.log('Mascotas:');
diego.getMascotas().forEach(mascota => {
    console.log(`- ${mascota.nombre} (${mascota.especie})`);
});

// Mostrar todos los clientes de PetCare
console.log('\n--- Lista de Clientes de PetCare ---');
veterinariaPetCare?.clientes.forEach(cliente => {
    console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre}, Teléfono: ${cliente.telefono}, VIP: ${cliente.vip}`);
    cliente.getMascotas().forEach(mascota => {
        console.log(`    Mascota: ${mascota.nombre}, Especie: ${mascota.especie}`);
    });
});

