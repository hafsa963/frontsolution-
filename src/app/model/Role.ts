import { Privilege } from "./Privilege";
import { user } from "./user";

export interface Role {
    id?: number;
    role: string;
    privileges: Privilege[];
    users: user[];
    
}
 