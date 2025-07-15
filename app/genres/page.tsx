import GenresTable from "@/components/genre/GenresTable";
import { GenreForm } from "@/components/genre/GenreForm";

export default function Genres() {
  return (
    <div className="mx-5 my-5">
      <div className="text-lg font-bold">Genres Page</div>

      <div className="flex items-center space-x-4 h-5 my-5">
        <GenreForm update={false} />
      </div>

      <GenresTable />
    </div>
  );
}
