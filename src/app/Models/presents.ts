export interface Emetteur {
    id: string;
    name: string;
  }
  
  export interface TypeAssemblee {
    id: string;
    name: string;
  }
  
  export interface Solde {
    id: string;
    amount: number;
  }
  
  export interface Presents {
    matricule: string;
    emetteur: Emetteur;
    typeAssemblee: TypeAssemblee;
    solde: Solde;
    typePresence: string;
  }
  export interface PresentsId {
    matricule: string;
    idEmetteur: string;
    idTypeAssemblee: string;
  }
    