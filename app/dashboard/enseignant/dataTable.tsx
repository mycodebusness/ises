"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Pen,
  Delete,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Enseignant as Payment } from "@/lib/types";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "@/components/ui/use-toast";
//import { deleteenseignant } from "@/lib/actions";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "mat_ens",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.original.mat_ens}</div>,
  },
  {
    accessorKey: "nom_postnom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom & PostNom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.nom_postnom}</div>,
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prénom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.prenom}</div>
    ),
  },
  {
    accessorKey: "specialite",
    header: "Spécialite",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.specialite}</div>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.grade}</div>
    ),
  },
  {
    accessorKey: "num_tel",
    header: "Téléphone",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.num_tel}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/enseignant/ajouter`}
                >
                  <Plus className="h-7 w-7 rounded-full text-white bg-green-800 hover:bg-green-600 p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Plus className="h-6 w-6 rounded-full" />
                <p>Ajouter u&apos;enseignant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/enseignant/${row.original.mat_ens}`}
                >
                  <Pen className="h-7 w-7 rounded-full text-white bg-blue-800 hover:bg-blue-600  p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Pen className="h-6 w-6 rounded-full" />
                <p>modifier l&apos;enseignant {row.original.mat_ens}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Delete className="h-7 w-7 rounded-full text-white bg-red-800 hover:bg-red-600 p-2 cursor-pointer" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="flex gap-2 justify-center items-center">
                  <Delete className="h-6 w-6 rounded-full" />
                  <p>supprimer l&apos;enseignant {row.original.mat_ens}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent>
              <DialogHeader>
                <DialogTitle> Suppression enseignant</DialogTitle>
                <DialogDescription>
                  Etes-vous sur de supprimer définitivement l&apos;enseignant 
                  {row.original.mat_ens} ?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fermer
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      // await deleteenseignant(Number(row.original.id));
                      toast({
                        title: "Supprimer",
                        description: `l&apos;enseignant ${row.original.mat_ens} a été supprimer avec succès`,
                        className: "bg-green-700 text-white",
                      });
                    } catch (error) {
                      toast({
                        title: "Erreur supprimer",
                        description: `Erreur lors de la suppression de l'enseignant`,
                        className: "bg-red-700 text-white",
                      });
                    }
                  }}
                >
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(6);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex items-center pb-4">
        <Input
          placeholder="Rechercher par enseignant..."
          value={
            (table.getColumn("nom_postnom")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("nom_postnom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total : {table.getFilteredRowModel().rows.length} enseignant(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex - 1);
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
