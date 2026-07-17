import { ItemFlim } from "@/types/api.types";
import { ItemSectionFlim } from "../home/itemSectionFlim";

interface ListMovieProps {
    items: ItemFlim[];
}

const ListMovie = ({ items }: ListMovieProps) => {
    if (!items || items.length === 0) {
        return (
            <div className="mt-8 text-center py-16">
                <p className="text-zinc-400 text-lg">Không tìm thấy phim nào</p>
            </div>
        );
    }

    return (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
                <ItemSectionFlim key={item._id} item={item} />
            ))}
        </div>
    );
};

export default ListMovie;