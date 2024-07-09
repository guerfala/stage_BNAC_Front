
import { Emetteur } from "./emetteur";

export interface Import {
    IdImport: number;
    Adresse: string;
    CAVE: string;
    CAVR: string;
    Client: string;
    CodeOperation: string;
    Codesisin: string;
    DateBourse: Date;
    DateDeNaissance:Date;
    DateImport: Date;
    DateOperation: Date;
    Identifiant: string;
    Libelle: string;
    Nationalite: string;
    NatureClient:String;
    NatureCompte:string;
    Nature_CompteE: string;
    Nature_CompteR: string;
    Nature_id: string;
    NumContrat:String;
    Quantite: number;
    SensComptable: number;
    Solde:number;
    Statut: string;
    TC:String;
    TCE:String;
    TCR:string;  
    Titre:String;
    Treated:boolean;
   
    TypeClient: string;
    TypeDeResidence:string;
    TypeImport: string;
    CAV:String;
    IdEmetteur: Emetteur;
  
  }
  