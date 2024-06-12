import { Emetteur } from "./emetteur";

export class Titre {
    idTitre!: string;
    libelleCourt!: string;
    libelleLong!: string;
    idCategorieTitre!: string;
    nominal!: number;
    nombre!: number;
    pourcentage!: number;
    codeStico!: string;
    codeSISIN!: string;
    matriculeDroitNonConverti!: string;
    matriculeDroitConverti!: string;
    emetteur!: Emetteur;
}
