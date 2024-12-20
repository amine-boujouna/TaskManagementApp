export interface Tache {
    id?: number; // Facultatif, généré par le backend
    titre: string;
    description: string;
    datedebut: Date;
    datefin: Date;
    etat: string; // Utilisez le même type que votre backend
    priorite: string;
    categorie: string; // Utilisez les mêmes types que dans votre backend
  }
  