export interface Emetteur {
    idEmetteur: string;
    derMatricule: number;
    LibelleCourt: string;
    libelleLong: string;
    codeStico: string;
    tel?: string;
    fax?: string;
    adresse?: string;
    ville?: string;
    codePostal?: string;
    premierResponsable?: string;
    contact?: string;
    email?: string;
    dateMaj?: Date;
    dateConvention?: Date;
    pourcentage?: number;
}
