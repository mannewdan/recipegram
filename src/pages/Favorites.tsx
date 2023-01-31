import SearchBar from "../components/SearchBar";

type FavoritesProps = {
  search: (query: string, sort?: string) => void;
};

export default function Favorites({ search }: FavoritesProps) {
  return (
    <>
      <SearchBar search={search} />
    </>
  );
}
