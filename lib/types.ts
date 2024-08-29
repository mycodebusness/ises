// Type pour les années académiques
export declare type AnneeAcademique = {
  id_annee: number;
  annee_debut: number;
  annee_fin: number;
};

// Type pour les enseignants
export declare type Enseignant = {
  mat_ens: number;
  nom_postnom: string;
  prenom: string;
  specialite?: string;
  grade?: string;
  num?: string;
  aven?: string;
  com?: string;
  vil?: string;
  num_tel?: string;
};

// Type pour les départements
export declare type Filiere = {
  id_departement: number;
  nom_departement: string;
};

// Type pour les promotions
export declare type Promotion = {
  id_promotion: number;
  nom_promotion: string;
  id_departement?: number;
  nom_departement?: string;
};

// Type pour les cours
export declare type Cours = {
  id_cours: number;
  intitule: string;
  ponderation?: number;
  volume_horaire?: number;
  id_promotion?: number;
  nom_promotion?: string;
};

// Type pour les horaires
export declare type Horaire = {
  id_horaire: number;
  jour?: string;
  date_horaire?: string; // Date au format ISO string
  heure_debut?: string; // Heure au format ISO string
  heure_fin?: string; // Heure au format ISO string
  validation?: boolean;
  id_cours?: number;
  intitule?: string;
};

// Type pour les fiches de prestation
export declare type FichePrestation = {
  id_cours: number;
  intitule?: string; //cours
  id_annee: number; // anneeacademique
  annee?: number; // anneeacademique (annee_fin-annee_fin) ex:2021-2022
  mat_ens: number; // enseignant
  nom_postnom?: string; // enseignant
  signature_section?: string;
};

// Type pour les prestations
export declare type Prestation = {
  id_prest: number;
  date_prest?: string; // Date au format ISO string
  debut_seance?: string; // Heure au format ISO string
  fin_seance?: string; // Heure au format ISO string
  matiere_promo?: string;
  id_cours?: number;
  id_annee?: number;
  mat_ens?: number;
};

// Type pour les utilisateurs
export declare type Users = {
  id: number;
  login: string;
  mdp: string;
  type?: string;
};

// Type représentant le résultat de la requête pour l'horaire des cours
export declare type HoraireCours = {
  jour: string; // 'Lundi', 'Mardi', 'Mercredi', etc.
  date_horaire: Date; // Date du cours (format ISO 8601)
  heure_debut: string; // Heure de début du cours (format 'HH:mm:ss')
  heure_fin: string; // Heure de fin du cours (format 'HH:mm:ss')
  cours_intitule: string; // Intitulé du cours
  nom_promotion: string; // Nom de la promotion
  nom_departement: string; // Nom du département (filière)
};

// Type représentant la promotion avec la filière associée
export declare type PromotionFiliere = {
  id_promotion: number; // ID de la promotion
  nom_promotion: string; // Nom de la promotion
  id_departement: number; // ID du département (filière)
  nom_departement: string; // Nom du département (filière)
};
