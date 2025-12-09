import { useInfiniteQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

export interface PaginatedProducts {
  items: Product[];
  nextPage: number | null;
}

const API_BASE = 'https://pharmacie-soleil.onrender.com';

async function fetchProductsPage(page: number): Promise<PaginatedProducts> {
  const limit = 22; // <--- AFFICHER 4 PAR 4

  const res = await fetch(`${API_BASE}/products?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Erreur fetch produits');

  const data: Product[] = await res.json();

  return {
    items: data,
    nextPage: data.length === limit ? page + 1 : null,
  };
}

export function useProductsInfinite() {
  return useInfiniteQuery(
    ['products-infinite'],
    ({ pageParam = 1 }: any) => fetchProductsPage(pageParam),
    {
      getNextPageParam: (lastPage: PaginatedProducts) =>
        lastPage.nextPage ?? undefined,

      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
}
