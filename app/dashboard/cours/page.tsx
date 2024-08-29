import React from "react";
import { sql } from "@vercel/postgres";
import { Cours } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Cours>`SELECT 
  C.id_cours, 
  C.intitule, 
  C.ponderation, 
  C.volume_horaire, 
  C.id_promotion, 
  P.nom_promotion
FROM 
  Cours C
LEFT JOIN 
  Promotion P ON C.id_promotion = P.id_promotion;
`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page gérer cours
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
