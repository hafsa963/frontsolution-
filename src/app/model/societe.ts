import { Manager } from "./Manager";
import { Prestation } from "./prestation";


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
    prestationList : Prestation [],
    managerVoList: Manager[];

}

 