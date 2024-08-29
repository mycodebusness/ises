import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: promotions } = await sql<{
    id_promotion: number;
    nom_promotion: string;
  }>`SELECT * from promotion`;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un enseignant
      </h2>
      <Formulaire nom_promotion={promotions} />
    </div>
  );
}

export default Page;
