"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  AnneeAcademique,
  Cours,
  Enseignant,
  FichePrestation,
  Filiere,
  Horaire,
  Promotion,
  Users,
} from "./types";
function revalidate() {
  revalidatePath("/dashboard/anneeacademique");
  revalidatePath("/dashboard/enseignant");
  revalidatePath("/dashboard/filiere");
  revalidatePath("/dashboard/promotion");
  revalidatePath("/dashboard/cours");
  revalidatePath("/dashboard/horaire");
  revalidatePath("/dashboard/ficheprestation");
  revalidatePath("/dashboard/prestation");
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
}
// function generateRandomNumber(min: number, max: number): number {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export async function addEnseignant(data: Omit<Enseignant, "mat_ens">) {
  const {
    nom_postnom,
    prenom,
    aven,
    com,
    grade,
    num,
    num_tel,
    specialite,
    vil,
  } = data;
  try {
    await sql`
    INSERT INTO enseignant (nom_postnom,prenom,aven,com,grade,num,num_tel,specialite,vil)
    VALUES (${nom_postnom},${prenom},${aven},${com},${grade},${num},${num_tel},${specialite},${vil});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/enseignant");
}
export async function upDateEnseignant(
  mat_ens: number,
  data: Omit<Enseignant, "mat_ens">
) {
  const {
    nom_postnom,
    prenom,
    aven,
    com,
    grade,
    num,
    num_tel,
    specialite,
    vil,
  } = data;
  try {
    await sql`
        UPDATE enseignant
    SET nom_postnom=${nom_postnom},prenom=${prenom},aven=${aven},com=${com},grade=${grade},num=${num},num_tel=${num_tel},specialite=${specialite},vil=${vil}
    WHERE mat_ens = ${mat_ens};`;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/enseignant");
}
export async function deleteEnseignant(mat_ens: number) {
  try {
    await sql`
    DELETE FROM enseignant
    WHERE mat_ens = ${mat_ens};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/enseignant");
}

export async function addCours(data: Omit<Cours, "id_cours">) {
  const { intitule, id_promotion, nom_promotion, ponderation, volume_horaire } =
    data;
  try {
    await sql`
    INSERT INTO cours (intitule,id_promotion,ponderation,volume_horaire)
    VALUES (${intitule},${id_promotion},${ponderation},${volume_horaire});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/cours");
}
export async function upDateCours(
  id_cours: number,
  data: Omit<Cours, "id_cours">
) {
  const { intitule, id_promotion, ponderation, volume_horaire } = data;
  try {
    await sql`
        UPDATE cours
    SET intitule=${intitule},id_promotion=${id_promotion},ponderation=${ponderation},volume_horaire=${volume_horaire}
    WHERE id_cours = ${id_cours};`;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/cours");
}
export async function deleteCours(id_cours: number) {
  try {
    await sql`
    DELETE FROM cours
    WHERE id_cours = ${id_cours};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/cours");
}

export async function addFiliere(data: Omit<Filiere, "id_departement">) {
  const { nom_departement } = data;
  try {
    await sql`
    INSERT INTO filiere (nom_departement)
    VALUES (${nom_departement});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/filiere");
}
export async function upDateFiliere(
  id_departement: number,
  data: Omit<Filiere, "id_departement">
) {
  const { nom_departement } = data;
  try {
    await sql`
    UPDATE filiere
SET nom_departement = ${nom_departement}
WHERE id_departement = ${id_departement};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/filiere");
}
export async function deleteFiliere(id_departement: number) {
  try {
    await sql`
    DELETE FROM filiere
    WHERE id_departement = ${id_departement};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/filiere");
}

export async function addFichePrestation(data: FichePrestation) {
  const { id_annee, id_cours, mat_ens, signature_section } = data;
  try {
    await sql`
    INSERT INTO fiche_prestation (id_annee, id_cours, mat_ens, signature_section)
    VALUES (${id_annee}, ${id_cours}, ${mat_ens}, ${signature_section});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/ficheprestation");
}
export async function upDateFichePrestation(
  id_anneeP: number,
  id_coursP: number,
  mat_ensP: number,
  data: FichePrestation
) {
  const { signature_section, id_annee, id_cours, mat_ens } = data;
  try {
    await sql`
    UPDATE fiche_prestation
SET id_annee =${id_annee},id_cours=${id_cours}, mat_ens=${mat_ens}, signature_section=${signature_section}
WHERE id_annee =${id_anneeP} AND id_cours=${id_coursP} AND mat_ens=${mat_ensP};`;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/ficheprestation");
}
export async function deleteFichePrestation(
  id_annee: number,
  id_cours: number,
  mat_ens: number
) {
  try {
    await sql`
    DELETE FROM fiche_prestation
    WHERE id_annee =${id_annee} AND id_cours=${id_cours} AND mat_ens=${mat_ens};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/ficheprestation");
}

export async function addPromotion(data: Omit<Promotion, "id_promotion">) {
  const { nom_promotion, id_departement } = data;
  console.log(`
    INSERT INTO promotion (nom_promotion,id_departement)
    VALUES (${nom_promotion},${id_departement});
  `);

  try {
    await sql`
    INSERT INTO promotion (nom_promotion,id_departement)
    VALUES (${nom_promotion},${id_departement});
  `;
  } catch (error) {
    console.log({ error });

    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/promotion");
}
export async function upDatePromotion(
  id_promotion: number,
  data: Omit<Promotion, "id_promotion">
) {
  const { nom_promotion, id_departement } = data;
  try {
    await sql`
    UPDATE promotion
SET nom_promotion = ${nom_promotion},id_departement=${id_departement}
WHERE id_promotion = ${id_promotion};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/promotion");
}
export async function deletePromotion(id_promotion: number) {
  try {
    await sql`
    DELETE FROM promotion
    WHERE id_promotion = ${id_promotion};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/promotion");
}

export async function addHoraire(data: Omit<Horaire, "id_horaire">) {
  const { date_horaire, heure_debut, heure_fin, id_cours, jour, validation } =
    data;
  try {
    await sql`
    INSERT INTO horaire (date_horaire,heure_debut,heure_fin,id_cours,jour,validation)
    VALUES (${date_horaire},${heure_debut},${heure_fin},${id_cours},${jour},${validation});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  revalidatePath(`/[id]`);
  revalidatePath(`/`);

  redirect("/dashboard/horaire");
}
export async function upDateHoraire(
  id_horaire: number,
  data: Omit<Horaire, "id_horaire">
) {
  const { date_horaire, heure_debut, heure_fin, id_cours, jour, validation } =
    data;
  try {
    await sql`
    UPDATE horaire
SET date_horaire=${date_horaire},heure_debut=${heure_debut},heure_fin=${heure_fin},id_cours=${id_cours},jour=${jour},validation=${validation}
WHERE id_horaire = ${id_horaire}; `;
  } catch (error) {
    console.log({ error });

    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/horaire");
}
export async function deleteHoraire(id_horaire: number) {
  try {
    await sql`
    DELETE FROM horaire
    WHERE id_horaire = ${id_horaire};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/horaire");
}

export async function addAnneeACademique(
  data: Omit<AnneeAcademique, "id_annee">
) {
  const { annee_debut, annee_fin } = data;
  try {
    await sql`
    INSERT INTO anneeacademique (annee_debut,annee_fin)
    VALUES (${annee_debut},${annee_fin});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/anneeacademique");
}
export async function upDateAnneeACademique(
  id_annee: number,
  data: Omit<AnneeAcademique, "id_annee">
) {
  const { annee_debut, annee_fin } = data;
  try {
    await sql`
    UPDATE anneeacademique
SET annee_debut=${annee_debut},annee_fin=${annee_fin}
WHERE id_annee = ${id_annee};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/anneeacademique");
}
export async function deleteAnneeACademique(id_annee: number) {
  try {
    await sql`
    DELETE FROM anneeacademique
    WHERE id_annee = ${id_annee};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/anneeacademique");
}

export async function addUser(data: Omit<Users, "id">) {
  const { login, mdp, type } = data;
  try {
    await sql`
    INSERT INTO users (login,mdp,type)
    VALUES (${login}, ${mdp}, ${type});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function upDateUser(id: number, data: Omit<Users, "id">) {
  const { login, mdp, type } = data;
  try {
    await sql`
    UPDATE users
SET login = ${login},
    mdp = ${mdp},
    type = ${type}
WHERE id = ${id};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function deleteUser(id: number) {
  try {
    await sql`
    DELETE FROM users
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

export async function handlelogin(data: { email: string; mdp: string }) {
  const { email, mdp } = data;

  const { rows, rowCount } =
    await sql<Users>`SELECT * from users WHERE login=${email} AND mdp=${mdp};`;

  if (rowCount != null && rowCount >= 1) {
    const { id, login, type } = rows[0];
    return {
      data: {
        id,
        nom: login,
      },
      role: type,
    };
  } else {
    return {
      data: {},
      role: "",
    };
  }
}
