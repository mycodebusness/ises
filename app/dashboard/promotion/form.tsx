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
import { addPromotion, upDatePromotion } from "@/lib/actions";
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
  nom_promotion: z.string().min(4, {
    message: "doit contenir aumoins 4 caractères.",
  }),
  id_departement: z.coerce.number({
    message: "doit contenir aumoins 4 caractères.",
  }),
});
export function Formulaire({
  id_promotion = 0,
  nom_promotion = "",
  id_departement = 0,
  nom_departement = [
    {
      id_departement: 0,
      nom_departement: "aucune filière",
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
      nom_promotion,
      id_departement,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id_promotion == 0) {
      try {
        await addPromotion(data);
        toast({
          title: "Ajouter",
          description: `la promotion ${data.nom_promotion} a été ajouter avec succès`,
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
        await upDatePromotion(id_promotion, data);
        toast({
          title: "Modifier",
          description: `la promotion ${data.nom_promotion}  a été modifier avec succès`,
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
          name="nom_promotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la promotion</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_departement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom filière</FormLabel>
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
                  {nom_departement.map((pres, index) => (
                    <SelectItem
                      key={index}
                      value={pres.id_departement?.toString()}
                    >
                      {pres.nom_departement}
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
