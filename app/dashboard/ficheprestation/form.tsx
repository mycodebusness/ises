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
import {
  addFichePrestation,
  addPromotion,
  upDateFichePrestation,
  upDatePromotion,
} from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  signature_section: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  id_cours: z.coerce.number({
    message: "doit être un chiffre",
  }),
  id_annee: z.coerce.number({
    message: "doit être un chiffre",
  }),
  mat_ens: z.coerce.number({
    message: "doit être un chiffre",
  }),
});
export function Formulaire({
  id_cours = 0,
  id_annee = 0,
  mat_ens = 0,
  signature_section = "false",
  cours = [
    {
      id_cours: 0,
      intitule: "aucune cours",
    },
  ],
  annee = [
    {
      id_annee: 0,
      annee_debut: 0,
      annee_fin: 0,
    },
  ],
  enseignant = [
    {
      mat_ens: 0,
      nom_postnom: "aucun nom",
      prenom: "aucun prenom",
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
      id_cours,
      id_annee,
      mat_ens,
      signature_section,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id_cours == 0) {
      try {
        await addFichePrestation(data);
        toast({
          title: "Ajouter",
          description: `la fiche a été ajoutée avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de la fiche`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateFichePrestation(id_annee, id_cours, mat_ens, data);
        toast({
          title: "Modifier",
          description: `la fiche a été modifier avec succès`,
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
          name="signature_section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valider</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Valider la fiche" />
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
          name="id_annee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année Académique</FormLabel>
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
                  {annee.map((pres, index) => (
                    <SelectItem key={index} value={pres.id_annee?.toString()}>
                      {pres.annee_debut}-{pres.annee_fin}
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
          name="id_cours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cours</FormLabel>
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
        <FormField
          control={form.control}
          name="mat_ens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enseignant</FormLabel>
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
                  {enseignant.map((pres, index) => (
                    <SelectItem key={index} value={pres.mat_ens?.toString()}>
                      {pres.nom_postnom} {pres.prenom}
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
