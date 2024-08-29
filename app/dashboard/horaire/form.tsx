"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addHoraire, upDateHoraire } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  jour: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  date_horaire: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  heure_debut: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  heure_fin: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  validation: z.coerce.boolean({
    message: "doit contenir aumoins 4 caractères.",
  }),
  id_cours: z.coerce.number({
    message: "doit contenir aumoins 4 caractères.",
  }),
});
export function Formulaire({
  id_horaire = 0,
  jour = "Lundi",
  date_horaire = "",
  heure_debut = "",
  heure_fin = "",
  validation = false,
  id_cours = 0,

  cours = [
    {
      id_cours: 0,
      intitule: "aucun cours enregistrer",
    },
  ],
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jour,
      date_horaire,
      heure_debut,
      heure_fin,
      validation,
      id_cours,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id_horaire == 0) {
      try {
        await addHoraire(data);
        toast({
          title: "Ajouter",
          description: `l'horaire ${id_horaire} a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de l'horaire`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateHoraire(id_horaire, data);
        toast({
          title: "Modifier",
          description: `la filière ${id_horaire}  a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifier",
          description: `Erreur lors de la modification`,
          className: "bg-red-700 text-white",
        });
      }
    }
    handleHidden();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="date_horaire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heure_debut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure début</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heure_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure fin</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jour"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jour de la semaine</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Lundi",
                    "Mardi",
                    "Mercredi",
                    "Jeudi",
                    "Vendredi",
                    "Samedi",
                    "Dimanche",
                  ].map((jour, index) => (
                    <SelectItem key={index} value={jour}>
                      {jour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="validation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validation</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key={1} value="true">
                    Oui
                  </SelectItem>
                  <SelectItem key={2} value="false">
                    Non
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_cours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom cours</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cours.map((pres, index) => (
                    <SelectItem key={index} value={pres.id_cours?.toString()}>
                      {pres.intitule}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
