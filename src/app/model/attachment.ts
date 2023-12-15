import { Client } from "./Client";

export interface Attachment {
    id:number | null | undefined,
    name:string | null | undefined,
    type:string | null | undefined,
    imagePath:string| null | undefined,
    clients:Client

}
