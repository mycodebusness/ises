import React from "react";
import { sql } from "@vercel/postgres";
import { Enseignant } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Enseignant>`SELECT * from enseignant where mat_ens=${idCl}`;
  const {
    mat_ens,
    nom_postnom,
    prenom,
    aven,
    com,
    grade,
    num,
    num_tel,
    specialite,
    vil,
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un enseignant
      </h2>
      <Formulaire
        nom_postnom={nom_postnom}
        prenom={prenom}
        aven={aven}
        com={com}
        grade={grade}
        num={num}
        num_tel={num_tel}
        specialite={specialite}
        vil={vil}
        mat_ens={mat_ens}
      />
    </div>
  );
}

export default Page;
