-- Table pour les années académiques
CREATE TABLE AnneeAcademique (
    id_annee SERIAL PRIMARY KEY,
    annee_debut INT NOT NULL,
    annee_fin INT NOT NULL
);

-- Table pour les enseignants
CREATE TABLE Enseignant (
    mat_ens SERIAL PRIMARY KEY,
    nom_postnom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    specialite VARCHAR(255),
    grade VARCHAR(50),
    num VARCHAR(50),
    aven VARCHAR(255),
    com VARCHAR(255),
    vil VARCHAR(255),
    num_tel VARCHAR(20)
);

-- Table pour les départements
CREATE TABLE Filiere (
    id_departement SERIAL PRIMARY KEY,
    nom_departement VARCHAR(255) NOT NULL
);

-- Table pour les promotions
CREATE TABLE Promotion (
    id_promotion SERIAL PRIMARY KEY,
    nom_promotion VARCHAR(255) NOT NULL,
    id_departement INT,
    FOREIGN KEY (id_departement) REFERENCES Filiere (id_departement)
);

-- Table pour les cours
CREATE TABLE Cours (
    id_cours SERIAL PRIMARY KEY,
    intitule VARCHAR(255) NOT NULL,
    ponderation DECIMAL(5, 2),
    volume_horaire INT,
    id_promotion INT,
    FOREIGN KEY (id_promotion) REFERENCES Promotion (id_promotion)
);

-- Table pour les horaires
CREATE TABLE Horaire (
    id_horaire SERIAL PRIMARY KEY,
    jour VARCHAR(20),
    date_horaire DATE,
    heure_debut TIME,
    heure_fin TIME,
    validation BOOLEAN,
    id_cours INT,
    FOREIGN KEY (id_cours) REFERENCES Cours (id_cours)
);

-- Table pour les fiches de prestation
CREATE TABLE Fiche_Prestation (
    id_cours INT,
    id_annee INT,
    mat_ens INT,
    signature_section VARCHAR(255),
    PRIMARY KEY (id_cours, id_annee, mat_ens),
    FOREIGN KEY (id_cours) REFERENCES Cours (id_cours),
    FOREIGN KEY (id_annee) REFERENCES AnneeAcademique (id_annee),
    FOREIGN KEY (mat_ens) REFERENCES Enseignant (mat_ens)
);

-- Table pour les prestations
CREATE TABLE Prestation (
    id_prest SERIAL PRIMARY KEY,
    date_prest DATE,
    debut_seance TIME,
    fin_seance TIME,
    matiere_promo VARCHAR(255),
    id_cours INT,
    id_annee INT,
    mat_ens INT,
    FOREIGN KEY (id_cours) REFERENCES Cours (id_cours),
    FOREIGN KEY (id_annee) REFERENCES AnneeAcademique (id_annee),
    FOREIGN KEY (mat_ens) REFERENCES Enseignant (mat_ens)
);

-- Table pour les utilisateurs
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    type VARCHAR(50)
);

-- requete recupération de l'horaire
WITH
    SemaineCourante AS (
        SELECT
            CURRENT_DATE AS date_actuelle,
            date_trunc('week', CURRENT_DATE) AS debut_semaine,
            date_trunc('week', CURRENT_DATE) + INTERVAL '6 days' AS fin_semaine
    )
SELECT h.jour, h.date_horaire, h.heure_debut, h.heure_fin, c.intitule AS cours_intitule, p.nom_promotion, f.nom_departement
FROM
    Horaire h
    JOIN Cours c ON h.id_cours = c.id_cours
    JOIN Promotion p ON c.id_promotion = p.id_promotion
    JOIN Filiere f ON p.id_departement = f.id_departement
    JOIN SemaineCourante s ON h.date_horaire BETWEEN s.debut_semaine AND s.fin_semaine
WHERE
    p.id_promotion = 3 -- Remplacez 'NomDeLaPromotion' par la promotion souhaitée
ORDER BY
    CASE
        WHEN h.jour = 'Lundi' THEN 1
        WHEN h.jour = 'Mardi' THEN 2
        WHEN h.jour = 'Mercredi' THEN 3
        WHEN h.jour = 'Jeudi' THEN 4
        WHEN h.jour = 'Vendredi' THEN 5
        WHEN h.jour = 'Samedi' THEN 6
        WHEN h.jour = 'Dimanche' THEN 7
    END,
    h.heure_debut;

-- requete selection promotion et filière
SELECT p.id_promotion, p.nom_promotion, f.id_departement, f.nom_departement
FROM Promotion p
    JOIN Filiere f ON p.id_departement = f.id_departement
ORDER BY p.nom_promotion;