// import { ChartRound } from "@/components/chartRound";
// import { ChartTimes } from "@/components/chartTimes";
// import { ModeToggle } from "@/components/toggletheme";
// import { CountsResult } from "@/lib/types";
// import { sql } from "@vercel/postgres";
// import React from "react";

// async function Page() {
//   const { rows: counts } = await sql<CountsResult>`SELECT
//         (SELECT COUNT(*) FROM Chambre) AS nombre_chambres,
//         (SELECT COUNT(*) FROM Personnel) AS nombre_utilisateurs,
//         (SELECT COUNT(*) FROM Client) AS nombre_clients,
//         (SELECT COUNT(*) FROM Reservation) AS nombre_reservations,
//         (SELECT COUNT(*) FROM Hotel) AS nombre_hotels`;

//   const { rows: revenueData } = await sql<{
//     date: Date;
//     revenu_total: number;
//   }>`SELECT
//         DATE(date) AS date,
//         SUM(montant) AS revenu_total
//       FROM
//           paiement
//       GROUP BY
//           DATE(date)
//       ORDER BY
//           DATE(date);`;

//   // Convert the `revenueData` rows into a format expected by `ChartTimes`
//   const chartData = revenueData.map((row) => ({
//     date: `${row.date?.getFullYear()}-${
//       row.date?.getMonth() + 1
//     }-${row.date?.getDate()}`,
//     revenu_total: row.revenu_total,
//   }));

//   return (
//     <div className="flex flex-col">
//       <main className="gap-4 p-4 lg:gap-6 lg:p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
//         <ChartRound
//           nb={counts[0].nombre_chambres}
//           title="Total Chambres"
//           label="chambres"
//         />
//         <ChartRound
//           nb={counts[0].nombre_clients}
//           title="Total Clients"
//           label="clients"
//         />
//         <ChartRound
//           nb={counts[0].nombre_reservations}
//           title="Total Reservations"
//           label="reservations"
//         />
//         <ChartRound
//           nb={counts[0].nombre_utilisateurs}
//           title="Total Utilisateurs"
//           label="utilisateurs"
//         />
//       </main>
//       <div>
//         <ChartTimes chartData={chartData} />
//       </div>
//     </div>
//   );
// }

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
import React from "react";

function Page() {
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
          <CardTitle className="text-4xl">10</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={10} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">45</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={45} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">45</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={45} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">45</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={45} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          p^=
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">45</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={45} aria-label="25% increase" />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total promotions</CardDescription>
          <CardTitle className="text-4xl">45</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            la totalité des .....
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={45} aria-label="25% increase" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
