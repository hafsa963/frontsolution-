import { Role } from "./Role";

 

export interface Privilege {
    id?: number;
    privilege: string;
    roles: Role[];
    
    
}
 