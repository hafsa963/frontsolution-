import { Attachment } from "./attachment";

export interface Client{
    id?: number,
    rs: string,
    forme:  string,
    capitale:  string,
    siege:  string,
    rc:  number,
    i_f:  number,
    ice:  number,
    ip:  number,
    cnss:  number,
    propriete:  string,
    ctNum:  string,
    qualite:  string,
    adresse:  string,
    complement:  string,
    codepostal:  string,
    ville:  string,
    coderegion:  string,
    pays:  string,
    tel:  string,
    telcopie:  string,
    email:  string,
    cmt:  string,
    etat:  string,
    displayClient :boolean,
    typesociete:  string,
    attachmentEntity: Attachment;
     
}

 



 

