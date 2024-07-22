import { Emetteur } from "./emetteur";

export class Import {
    adresse!: string;
    cave!: string;
    cavr!: string;
    client!: string;
    code_operation!: string;
    codesisin!: string;
    date_bourse!: Date;
    date_de_naissance!: Date;
    date_import!: Date;
    date_operation!: Date;
    identifiant!: string;
    libelle!: string;
    nationalite!: string;
    nature_client!: string;
    nature_compte!: string;
    nature_comptee!: string;
    nature_compter!: string;
    nature_id!: string;
    num_contrat!: string;
    quantite!: number;
    sens_comptable!: string;
    solde!: number;
    statut!: string;
    tc!: string;
    tce!: string;
    tcr!: string;
    titre!: string;
    treated!: boolean;
    type_client!: string;
    type_de_residence!: string;
    type_import!: string;
    cav!: string;
    emetteur!: Emetteur | null;
  }
  