import React from "react";
import { sql } from "@vercel/postgres";
import { AnneeAcademique } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<AnneeAcademique>`SELECT * from anneeacademique where id_annee=${idCl}`;
  const { annee_debut, annee_fin, id_annee } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une nouvelle année académique
      </h2>
      <Formulaire
        annee_debut={annee_debut}
        annee_fin={annee_fin}
        id_annee={id_annee}
      />
    </div>
  );
}

export default Page;
