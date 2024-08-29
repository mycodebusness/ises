import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: cours } = await sql<{
    id_cours: number;
    intitule: string;
  }>`SELECT * from cours`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter de la filière
      </h2>
      <Formulaire cours={cours} />
    </div>
  );
}

export default Page;
