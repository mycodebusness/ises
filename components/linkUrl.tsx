"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar } from "./ui/avatar";
import { toast } from "./ui/use-toast";
import {
  IconBook,
  IconBriefcaseFilled,
  IconCalendarFilled,
  IconCalendarStats,
  IconHome,
  IconHome2,
  IconTags,
  IconUser,
  IconUserCog,
} from "@tabler/icons-react";
import { FileChartLine } from "lucide-react";
function LinkUrl() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <IconHome2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Ises Likasi</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard" ? "bg-muted text-primary" : null
                }`}
              >
                <IconHome className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/anneeacademique"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/anneeacademique"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconCalendarStats className="h-5 w-5" />
                <span className="sr-only">Année académique</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Année académique</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/enseignant"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/enseignant"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconUser className="h-5 w-5" />
                <span className="sr-only">enseignant</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">enseignants</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/filiere"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/filiere"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconBriefcaseFilled className="h-5 w-5" />
                <span className="sr-only">Filière</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Filière</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/promotion"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/promotion"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconTags className="h-5 w-5" />

                <span className="sr-only">promotions</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">promotions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/cours"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/cours"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconBook className="h-5 w-5" />
                <span className="sr-only">cours</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">cours</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/horaire"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/horaire"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconCalendarFilled className="h-5 w-5" />
                <span className="sr-only">Horaire</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Horaires</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/ficheprestation"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/ficheprestation"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <FileChartLine className="h-5 w-5" />
                <span className="sr-only">Fiche de prestation</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Fiche de prestations</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/users"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <IconUserCog className="h-5 w-5" />
                <span className="sr-only">Utilisateurs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Utilisateurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7 bg-blue-700 cursor-pointer" asChild>
              <IconUserCog className="p-1" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Votre compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response = await fetch("/api/auth/logout");

                if (response.ok) {
                  // Redirige l'utilisateur après une connexion réussie
                  toast({
                    title: "Déconnexion réussie",
                    description: "Vous êtes maintenant déconnecté.",
                    className: "bg-green-700",
                  });
                  window.location.href = "/login";
                } else {
                  toast({
                    title: "Échec de l'authentification",
                    description: "Erreur de deconnexion.",
                    className: "bg-red-700",
                  });
                }
              }}
            >
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default LinkUrl;
