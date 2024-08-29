import React from "react";
import { sql } from "@vercel/postgres";
import { Filiere } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Filiere>`SELECT * from filiere where id_departement=${idCl}`;
  const { id_departement, nom_departement } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une nouvelle filière
      </h2>
      <Formulaire
        id_departement={id_departement}
        nom_departement={nom_departement}
      />
    </div>
  );
}

export default Page;
