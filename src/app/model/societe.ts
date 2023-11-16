import { Manager } from "./Manager";


export interface Societe{
    id? : number,
    nom  : String ,
    forme : String ,
    capitale : String,
    rc : number ,
    i_f : number ,
    ice  : number ,
    ip : number,
    cnss : number,
    propriete : String,
    siege : string,
    etat : string,
    managerVoList: Manager[];
}
 