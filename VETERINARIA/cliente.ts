import { generadorID } from './id';
import { Mascota } from './mascota';


export class Cliente {
    id: number;
    nombre: string;
    telefono: string;
    vip: boolean;
    visitas: number;
    mascotas: Mascota[];

    constructor(nombre: string, telefono: string, nombresMascotas: { nombre: string, especie: string }[]) {
        this.id = generadorID.generarID();
        this.nombre = nombre;
        this.telefono = telefono;
        this.visitas = 0;
        this.vip = false;
        this.mascotas = nombresMascotas.map(mascota => new Mascota(mascota.nombre, mascota.especie, this.id));
    }

    getId(): number { 
        return this.id; 
    }

    incrementarVisitas(): void {
        this.visitas++;
        if (this.visitas >= 5) {
            this.vip = true;
        }
    }

    getMascotas(): Mascota[] {
        return this.mascotas;
    }
}

  
