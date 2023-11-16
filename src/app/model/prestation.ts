import { Etape } from "./etape";

export interface Prestation {
    id?: number,
    namePrestation: string,
    etapeDtoList: Etape[]
}
