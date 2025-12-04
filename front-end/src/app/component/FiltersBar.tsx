"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter } from "lucide-react";
import { Product } from "@/types/product";



type Filters = {
  search: string;
  category: string | null;
  type: string | null;
  sort: "Pertinence" | "Nom" | "Prix" | "Popularité";
};

interface FiltersBarProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

export function FiltersBar({ products, onFilter }: FiltersBarProps) {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: null,
    type: null,
    sort: "Pertinence",
  });

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((p) => p.type === filters.type);
    }

    switch (filters.sort) {
      case "Nom":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Prix":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Popularité":
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "Pertinence":
      default:
        result.sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0));
        break;
    }

    return result;
  }, [filters, products]);

  useEffect(() => {
    onFilter(filteredProducts);
  }, [filteredProducts, onFilter]);

  const updateFilter = (key: keyof Filters, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-gray-50 border rounded-xl">
      <div className="flex items-center gap-4">
        <span className="font-medium">Filtres et Tri</span>
        <div className="relative">
          <Input
            placeholder="Rechercher des produits..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              {filters.category || "Catégorie"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => updateFilter("category", null)}>Toutes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("category", "Médicament")}>Médicaments</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("category", "Nutrition")}>Nutrition</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("category", "Accessoire")}>Accessoires</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("category", "Service")}>Services</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> {filters.type || "Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => updateFilter("type", null)}>Tous</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("type", "Injectable")}>Injectable</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("type", "Bio")}>Bio</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("type", "Sport")}>Sport</DropdownMenuItem>
            <DropdownMenuItem onClick={() => updateFilter("type", "Premium")}>Premium</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
