import { Actionnaire } from "./actionnaire";
import { Emetteur } from "./emetteur";
import { TeneurCompte } from "./teneur-compte";
import { NatureAvoir } from "./nature-avoir";
//import { NatureCompteTitre } from "./nature-compte-titre";
import { Titre } from "./titre";
import { TypeOperation } from "./type-operation";

export class Operation {
    IdOperation !: number;
    actionnaire!: Actionnaire;
    emetteur!: Emetteur;
    titre !: Titre;
    TeneurCompte !:TeneurCompte;
    DateBourse!: Date;
    //natureCompteTitre!: NatureCompteTitre;
    natureAvoir!:NatureAvoir;
    DateOperation !: Date;
    IdTC2!: string;
    Matricule2!:number;
    typeOperation!: TypeOperation;
    Quantite !: number;
    Cours !: number;
    Duree!: number;
    MontantNet!: number;
    RS!: number;
    Principal!: number;
    RestantDu!: number;
    IdOSTTCLT!: number;
    IdEmprunt !: string;
    IdOperationBO !: string;
    Parametre1 !: string;
    Parametre2 !: string;
    Pur!: boolean;
    Comptabilisee !: boolean;
    IdUtilisateur !: number;
    RefOperation !: string;
    Creancier !: string;
    NumContrat !: string;

}
