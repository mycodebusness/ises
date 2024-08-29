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
import { addEnseignant, upDateEnseignant } from "@/lib/actions";

const FormSchema = z.object({
  nom_postnom: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  prenom: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  specialite: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  grade: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  num: z.string({
    message: "doit contenir aumoins 2 caractères.",
  }),
  aven: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  com: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  vil: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  num_tel: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  mat_ens = 0,
  nom_postnom = "",
  prenom = "",
  specialite = "",
  grade = "",
  num = "",
  aven = "",
  com = "",
  vil = "",
  num_tel = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom_postnom,
      prenom,
      specialite,
      grade,
      num,
      aven,
      com,
      vil,
      num_tel,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (mat_ens == 0) {
      try {
        await addEnseignant(data);
        toast({
          title: "Ajouter",
          description: `le utilisateur ${data.nom_postnom} a été ajouter avec succès`,
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
        await upDateEnseignant(mat_ens, data);
        toast({
          title: "Modifier",
          description: `l'utilisateur ${data.nom_postnom}  a été modifier avec succès`,
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
          name="nom_postnom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom & PostNom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prenom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>spécialité</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num_tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="num"
          render={({ field }) => (
            <FormItem>
              <FormLabel>numéro maison</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aven"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avénue</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="com"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commune</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input {...field} />
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
