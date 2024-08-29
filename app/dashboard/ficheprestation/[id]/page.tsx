import React from "react";
import { sql } from "@vercel/postgres";
import { FichePrestation } from "@/lib/types";
import { Formulaire } from "../form";
async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? String(params.id) : "";
  const urldata = idCl.split("-");
  const idannee = Number(urldata[0]);
  const idcours = Number(urldata[1]);
  const matens = Number(urldata[2]);
  const signaturesection = String(urldata[3]);
  console.log({ idannee, idcours, matens, signaturesection });

  const { rows: annees } = await sql<{
    id_annee: number;
    annee_debut: number;
    annee_fin: number;
    id_departement: number;
    nom_departement: string;
  }>`SELECT * from anneeacademique`;
  const { rows: enseignant } = await sql<{
    mat_ens: number;
    nom_postnom: string;
    prenom: string;
  }>`SELECT * from enseignant`;
  const { rows: cours } = await sql<{
    id_cours: number;
    intitule: string;
  }>`SELECT * from cours`;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une fiche de prestattion
      </h2>
      <Formulaire
        annee={annees}
        cours={cours}
        enseignant={enseignant}
        id_annee={idannee}
        id_cours={idcours}
        mat_ens={matens}
        signature_section={signaturesection}
      />
    </div>
  );
}

export default Page;
