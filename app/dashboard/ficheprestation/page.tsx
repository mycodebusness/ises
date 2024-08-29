import React from "react";
import { sql } from "@vercel/postgres";
import { ModeToggle } from "@/components/toggletheme";
import { FichePrestation } from "@/lib/types";
import { DataTable } from "./dataTable";

export default async function Page() {
  const { rows } = await sql<FichePrestation>`
  SELECT 
  FP.id_cours, 
  C.intitule,
  FP.id_annee, 
  CONCAT(AA.annee_debut, '-', AA.annee_fin) AS annee, 
  FP.mat_ens, 
  E.nom_postnom, 
  FP.signature_section
FROM 
  Fiche_Prestation FP
LEFT JOIN 
  Cours C ON FP.id_cours = C.id_cours
LEFT JOIN 
  AnneeAcademique AA ON FP.id_annee = AA.id_annee
LEFT JOIN 
  Enseignant E ON FP.mat_ens = E.mat_ens;

`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page gérer les fiches de prestations
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
