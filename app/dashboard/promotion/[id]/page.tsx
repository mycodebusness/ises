import React from "react";
import { sql } from "@vercel/postgres";
import { Promotion } from "@/lib/types";
import { Formulaire } from "../form";
async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows: departements } = await sql<{
    id_departement: number;
    nom_departement: string;
  }>`SELECT * from filiere`;
  const { rows } =
    await sql<Promotion>`SELECT * from promotion where id_promotion=${idCl}`;
  const { id_departement, id_promotion, nom_promotion } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une promotion
      </h2>
      <Formulaire
        id_departement={id_departement}
        id_promotion={id_promotion}
        nom_departement={departements}
        nom_promotion={nom_promotion}
      />
    </div>
  );
}

export default Page;
