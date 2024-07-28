export interface Demandeur{

    id?: number;
    telephone?: string;
    datedenaissance?: string;
    lieudenaissance?: string;
    adresse?: string;
    sexe?: string;
    fonction?: string;
    nin?: string;
    scannernin?: string;
    prenom?: string;
    nom?: string;
    email?: string;
    statut?:string;
    utilisateurDTO?: any;
    demandeDTO?: any;
    completed?:boolean;
    displayPicture?: any;
    type?:any;
}