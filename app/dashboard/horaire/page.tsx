import React from "react";
import { sql } from "@vercel/postgres";
import { Horaire } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Horaire>`SELECT 
  H.id_horaire, 
  H.jour, 
  H.date_horaire, 
  H.heure_debut, 
  H.heure_fin, 
  H.validation, 
  H.id_cours, 
  C.intitule
FROM 
  Horaire H
LEFT JOIN 
  Cours C ON H.id_cours = C.id_cours;
`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page gérer horaire
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
