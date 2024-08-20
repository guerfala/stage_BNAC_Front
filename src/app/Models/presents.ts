export interface Presents {
  IdPresent: number;
  idEmetteur: string;
  IdTypeAssemblee: string;
  Matricule: number;
  dateTenue: Date;
  // Omit relational properties (emetteur, typeAssemblee, actionnaire) for now
}

export interface PresentsId {
  idEmetteur: string;
  IdTypeAssemblee: string;
  Matricule: number;
  IdPresent: number;
}