// export default Page;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sql } from "@vercel/postgres";
import React from "react";

async function Page() {
  const { rows } = await sql<{
    anneeacademique: number;
    enseignants: number;
    filieres: number;
    promotions: number;
    cours: number;
    horaires: number;
    fiche_prestations: number;
    prestations: number;
    users: number;
  }>`
  SELECT 
  (SELECT COUNT(*) FROM anneeacademique) AS anneeacademique,
  (SELECT COUNT(*) FROM enseignant) AS enseignants,
  (SELECT COUNT(*) FROM filiere) AS filieres,
  (SELECT COUNT(*) FROM promotion) AS promotions,
  (SELECT COUNT(*) FROM cours) AS cours,
  (SELECT COUNT(*) FROM horaire) AS horaires,
  (SELECT COUNT(*) FROM fiche_prestation) AS fiche_prestations,
  (SELECT COUNT(*) FROM prestation) AS prestations,
  (SELECT COUNT(*) FROM users) AS users;
`;
  const {
    anneeacademique,
    cours,
    enseignants,
    fiche_prestations,
    filieres,
    horaires,
    prestations,
    promotions,
    users,
  } = rows[0];
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 p-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Tableau de bord</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Bienvenu sur votre tableau de bord pour la gestion des horaires et
            des différentes prestations
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Prêt</Button>
        </CardFooter>
      </Card>
      <Card className="sm:col-span-1" x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total cours</CardDescription>
          <CardTitle className="text-4xl">{cours}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des cours
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={cours} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">{promotions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des promotions
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={promotions} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="pb-2">
          <CardDescription>Total années académiques</CardDescription>
          <CardTitle className="text-4xl">{anneeacademique}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des années académiques
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={anneeacademique} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-4">
        <CardHeader className="pb-2">
          <CardDescription>Total prestations</CardDescription>
          <CardTitle className="text-4xl">{prestations}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des prestations
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={prestations} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-5">
        <CardHeader className="pb-2">
          <CardDescription>Total filières</CardDescription>
          <CardTitle className="text-4xl">{filieres}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des filières
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={filieres} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-6">
        <CardHeader className="pb-2">
          <CardDescription>Total enseignants</CardDescription>
          <CardTitle className="text-4xl">{enseignants}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des enseignants
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={enseignants} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-7">
        <CardHeader className="pb-2">
          <CardDescription>Total horaires</CardDescription>
          <CardTitle className="text-4xl">{horaires}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des horaires
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={horaires} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-8">
        <CardHeader className="pb-2">
          <CardDescription>Total fiches de prestations</CardDescription>
          <CardTitle className="text-4xl">{fiche_prestations}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des fiches de prestations
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={fiche_prestations} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-9">
        <CardHeader className="pb-2">
          <CardDescription>Total fiches de Utilisateurs</CardDescription>
          <CardTitle className="text-4xl">{users}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des fiches de Utilisateurs
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={users} aria-label="25% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
