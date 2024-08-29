import * as React from "react";
import CarouselDemo from "../carroussel";
import NavigationMenu from "../menu";
import { sql } from "@vercel/postgres";
import { HoraireCours, PromotionFiliere } from "@/lib/types";
import NavigationMenus from "../menu";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { rows } =
    await sql<PromotionFiliere>`SELECT p.id_promotion, p.nom_promotion, f.id_departement, f.nom_departement
FROM Promotion p
    JOIN Filiere f ON p.id_departement = f.id_departement
ORDER BY p.nom_promotion;
`;
  const { rows: horaires } = await sql<HoraireCours>`WITH
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
    p.id_promotion =${id} -- Remplacez 'NomDeLaPromotion' par la promotion souhaitée
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
`;
  return (
    <div className="w-full h-screen">
      <NavigationMenus components={rows} />
      <CarouselDemo horaires={horaires} />
    </div>
  );
}
