export interface Assemblee {
    idAssemblee?: number;
    libelle: string;
    lieu: string;
    dateTenue: string;
    typeAssemblee: {
      idTypeAssemblee: string;
    };
    emetteur: {
      idEmetteur: string;
    };
  }
  