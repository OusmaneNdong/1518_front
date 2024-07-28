export interface Utilisateur{

    id?:number;
    email?:string;
    password?:string;
    statut?:string;
    prenom?:string;
    nom?:string;
    nin?:string;
    passePort?:string;
   demandeur?: any;
}