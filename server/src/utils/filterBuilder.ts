export interface queryProps {
  pageNumber?: number;
  genre: string;
  age: number | null;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

export type FilterProps = {
  genre?: { $all: string[] };
  age?: { $gte: number };
  price?: { $gte?: number; $lte?: number };
};

export const filterBuilder = (filter: queryProps) => {
  const filters: FilterProps = {};
  if (filter.genre) {
    const genreOpts = filter.genre.split("_");
    filters.genre = { $all: genreOpts };
  }

  if (filter.age) {
    filters.age = { $gte: filter.age };
  }
  if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
    filters.price = {};
    if (filter.minPrice !== undefined) {
      filters.price.$gte = filter.minPrice;
    }
    if (filter.maxPrice !== undefined) {
      filters.price.$lte = filter.maxPrice;
    }
  }

  return filters;
};
