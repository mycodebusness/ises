import React from "react";
import { sql } from "@vercel/postgres";
import { Horaire } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Horaire>`SELECT * from horaire where id_horaire=${idCl}`;
  const {
    id_horaire,
    date_horaire,
    heure_debut,
    heure_fin,
    id_cours,
    jour,
    validation,
  } = rows[0];
  const { rows: cours } = await sql<{
    id_cours: number;
    intitule: string;
  }>`SELECT * from cours`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier l&apos;horaire
      </h2>
      <Formulaire
        cours={cours}
        id_horaire={id_horaire}
        date_horaire={date_horaire}
        heure_debut={heure_debut}
        heure_fin={heure_fin}
        id_cours={id_cours}
        jour={jour}
        validation={validation}
      />
    </div>
  );
}

export default Page;
