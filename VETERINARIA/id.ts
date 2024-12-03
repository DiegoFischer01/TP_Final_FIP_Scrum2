
export interface GeneradorID {
    generarID(): number;
}


export class GeneradorIDImpl implements GeneradorID {
    private static IDsExistentes: number[] = [];

    generarID(): number {
        let id: number;
        do {
            id = Math.floor(Math.random() * 10000);
        } while (GeneradorIDImpl.IDsExistentes.includes(id));

        GeneradorIDImpl.IDsExistentes.push(id);
        return id;
    }
}


const generadorID = new GeneradorIDImpl();
export { generadorID };
