import { useInfiniteQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

export interface PaginatedProducts {
  items: Product[];
  nextPage: number | null;
}

const API_BASE = 'https://pharmacie-soleil.onrender.com';

async function fetchProductsPage({ pageParam = 1 }): Promise<PaginatedProducts> {
  const limit = 12;

  const res = await fetch(`${API_BASE}/products?page=${pageParam}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('Erreur fetch produits');
  }

  const data: Product[] = await res.json();

  return {
    items: data,
    nextPage: data.length === limit ? pageParam + 1 : null,
  };
}

export function useProductsInfinite() {
  return useInfiniteQuery(
    ['products-infinite'], // query key
    ({ pageParam = 1 }) => fetchProductsPage({ pageParam }), // query function
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
}
