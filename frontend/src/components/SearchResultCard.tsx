import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { Banknote, Clock } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-56 h-44 md:h-40 flex-shrink-0">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              {restaurant.restaurantName}
            </h3>
            <div className="text-sm text-gray-600 mb-3">
              {restaurant.cuisines.join(" • ")}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="flex items-center text-green-600 gap-1">
                <Clock /> <span>{restaurant.estimatedDeliveryTime} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Banknote />
                <span className="font-bold">Rs{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">Updated {new Date(restaurant.lastUpdated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
