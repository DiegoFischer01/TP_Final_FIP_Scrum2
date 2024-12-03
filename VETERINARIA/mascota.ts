export class Mascota {
    id: number;
    nombre: string;
    especie: string;

    constructor(nombre: string, especie: string, idCliente: number) {
        this.nombre = nombre;
        this.especie = this.validarEspecie(especie);
        this.id = idCliente;
    }

    validarEspecie(especie: string): string {
      return ["perro", "gato"].includes(especie.toLowerCase()) ? especie : "exótica";
  }
}