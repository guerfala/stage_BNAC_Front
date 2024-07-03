
import { Emetteur } from "./emetteur";

export interface Import {
    idImport: number;
    libelle: string;
    sensComptable: number;
    codeOperation: string;
    codeSISIN: string;
    dateOperation: Date;
    dateImport: Date;
    dateBourse: Date;
    numContrat: string;
    cave: string;
    cavr: string;
    natureCompteE: string;
    natureCompteR: string;
    client: string;
    quantite: number;
    typeClient: string;
    natureId: string;
    identifiant: string;
    nationalite: string;
    adresse: string;
    statut: string;
    typeImport: string;
    treated: boolean;
    emetteur: Emetteur;
  }
  