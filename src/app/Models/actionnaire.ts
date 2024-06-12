import { Emetteur } from "./emetteur";

export class Actionnaire {
    matricule!: number;
    emetteur!: Emetteur;
    raisonSociale!: string;
    natureAvoir!: any;
    adresse!: string;
    ville!: string;
    codePostal!: string;
    idGenre!: number;
    idGroupe!: string;
    sexe!: string;
    idPays!: string;
    idNationalite!: string;
    email!: string;
    resident!: boolean;
    soldeConfirme!: boolean;
    idStatus!: string;
    identifiant!: string;
    naturePiece!: string;
    codeBO!: string;
    titreActionnaire!: number;
    titreConservation!: number;
    titreStico!: number;
    idAgence!: number;
    rib!: string;
    cleAncienne!: string;
    dateMaj!: Date;
    annule!: boolean;
    profession!: string;
}
