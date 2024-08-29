"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { addCours, upDateCours } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  intitule: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  ponderation: z.coerce.number({
    message: "doit être valide.",
  }),
  volume_horaire: z.coerce.number({
    message: "doit être valide.",
  }),
  id_promotion: z.coerce.number({
    message: "doit être valide.",
  }),
});

export function Formulaire({
  id_cours = 0,
  intitule = "",
  ponderation = 0,
  volume_horaire = 0,
  id_promotion = 0,
  nom_promotion = [
    {
      id_promotion: 0,
      nom_promotion: "aucune promotion ajoutée",
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
      intitule,
      ponderation,
      volume_horaire,
      id_promotion,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id_cours == 0) {
      try {
        await addCours(data);
        toast({
          title: "Ajouter",
          description: `le utilisateur ${data.intitule} a été ajouter avec succès`,
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
        await upDateCours(id_cours, data);
        toast({
          title: "Modifier",
          description: `l'utilisateur ${data.intitule}  a été modifier avec succès`,
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
          name="intitule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom cours</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ponderation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pondération</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="volume_horaire"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume horaire</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_promotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom promotion</FormLabel>
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
                  {nom_promotion.map((pres, index) => (
                    <SelectItem
                      key={index}
                      value={pres.id_promotion?.toString()}
                    >
                      {pres.nom_promotion}
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
