export interface Demande{
    id?: number;
    urlattestation?: string,
    statut?: string,
    numerodemande?: string,
    datedemande?: any,
    datetraitement?: any,
    validite?: boolean,
    objetdemande?: string,
    descriptiondemande?: string,
    certificationDTO?: any,
    utilisateurDTO?: any,
    demandeurDTO?: any;
    dateexpiration?:any;

}