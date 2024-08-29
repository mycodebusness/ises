import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HoraireCours } from "@/lib/types";

export default function CarouselDemo({
  horaires,
}: {
  horaires: HoraireCours[];
}) {
  return (
    <Carousel className="w-[80%] grow mt-16 mx-auto ">
      <CarouselContent>
        {horaires.map((horaire, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div>
              <Card>
                <CardContent className="flex aspect-square flex-col bg-slate-200">
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {horaire.cours_intitule}
                  </h2>
                  <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li key={horaire.heure_debut}>
                      Heure début : {horaire.heure_debut}
                    </li>
                    <li key={horaire.heure_fin}>
                      Heure fin: {horaire.heure_fin}
                    </li>
                  </ul>
                  <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    {horaire.jour}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Date :{" "}
                    {new Date(horaire.date_horaire).toLocaleDateString() || ""}
                  </p>
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
