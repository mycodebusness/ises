import * as React from "react";
import { sql } from "@vercel/postgres";
import { PromotionFiliere } from "@/lib/types";
import NavigationMenus from "./menu";
import Image from "next/image";

export default async function Page() {
  const { rows } =
    await sql<PromotionFiliere>`SELECT p.id_promotion, p.nom_promotion, f.id_departement, f.nom_departement
FROM Promotion p
    JOIN Filiere f ON p.id_departement = f.id_departement
ORDER BY p.nom_promotion;
`;

  return (
    <div className="w-full h-screen">
      <NavigationMenus components={rows} />

      <div className="pt-32 md:py-12 xl:container m-auto px-6 md:px-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 my-auto w-96 h-32 rotate-45 bg-gradient-to-r from-primaryLight to-secondaryLight blur-3xl opacity-50 dark:opacity-20"
        ></div>
        <div className="relative lg:flex lg:items-center lg:gap-12">
          <div className="text-center lg:text-left md:mt-12 lg:mt-0 sm:w-10/12 md:w-2/3 sm:mx-auto lg:mr-auto lg:w-6/12">
            <h1 className="text-gray-900 font-bold text-4xl md:text-6xl lg:text-5xl xl:text-6xl dark:text-white">
              ISES{" "}
              <span className="text-primary dark:text-primaryLight">
                Likasi.
              </span>
            </h1>
            <p className="mt-8 text-gray-600 dark:text-gray-300 mb-10">
              Bienvenue chez nous ! Venez et étudiez dans les meilleurs cadres !
              Chez nous, votre avenir est assuré par un enseignemet de qualité !
            </p>
            <Image width={200} height={200} src="/ises.png" alt="ises logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
