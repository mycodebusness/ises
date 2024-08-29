import React from "react";
import { sql } from "@vercel/postgres";
import { Cours } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } = await sql<Cours>`SELECT * from cours where id_cours=${idCl}`;
  const { id_cours, intitule, id_promotion, ponderation, volume_horaire } =
    rows[0];
  const { rows: promotions } = await sql<{
    id_promotion: number;
    nom_promotion: string;
  }>`SELECT * from promotion`;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un cours
      </h2>
      <Formulaire
        id_cours={id_cours}
        id_promotion={id_promotion}
        intitule={intitule}
        nom_promotion={promotions}
        ponderation={ponderation}
        volume_horaire={volume_horaire}
      />
    </div>
  );
}

export default Page;
