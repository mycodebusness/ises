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
import { addAnneeACademique, upDateAnneeACademique } from "@/lib/actions";

const FormSchema = z.object({
  annee_debut: z.coerce.number({
    message: "doit être valide",
  }),
  annee_fin: z.coerce.number({
    message: "doit être valide",
  }),
});
export function Formulaire({ id_annee = 0, annee_debut = 0, annee_fin = 0 }) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      annee_debut,
      annee_fin,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id_annee == 0) {
      try {
        await addAnneeACademique(data);
        toast({
          title: "Ajouter",
          description: `l'année ${data.annee_debut}-${data.annee_fin} a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du utilisateur`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateAnneeACademique(id_annee, data);
        toast({
          title: "Modifier",
          description: `l'année ${data.annee_debut}-${data.annee_fin}  a été modifier avec succès`,
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
          name="annee_debut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année début</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="annee_fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année fin</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
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
