import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
async function Page() {
  const { rows: annees } = await sql<{
    id_annee: number;
    annee_debut: number;
    annee_fin: number;
    id_departement: number;
    nom_departement: string;
  }>`SELECT * from anneeacademique`;
  const { rows: enseignant } = await sql<{
    mat_ens: number;
    nom_postnom: string;
    prenom: string;
  }>`SELECT * from enseignant`;
  const { rows: cours } = await sql<{
    id_cours: number;
    intitule: string;
  }>`SELECT * from cours`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter de la fiche de prestation
      </h2>
      <Formulaire enseignant={enseignant} annee={annees} cours={cours} />
    </div>
  );
}

export default Page;
