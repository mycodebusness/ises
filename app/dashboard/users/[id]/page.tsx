import React from "react";
import { sql } from "@vercel/postgres";
import { Users } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } = await sql<Users>`SELECT * from users where id=${idCl}`;
  const { id, login, mdp, type } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un utilisateur
      </h2>
      <Formulaire login={login} id={id} mdp={mdp} type={type} />
    </div>
  );
}

export default Page;
