import { useGetAllRestaurants } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import { useGetMyUser } from "@/api/MyUserApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { currentUser, isLoading } = useGetMyUser();

  if (isLoading) return <div>Loading...</div>;

  if (currentUser?.role === "owner") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, Restaurant Owner!</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Manage your restaurant, update menu items, and track orders from your dashboard.
        </p>
        <Link to="/manage-restaurant">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Go to Restaurant Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div id="all-restaurants" className="space-y-4">
        <h2 className="text-2xl font-bold">All Restaurants</h2>
        <AllRestaurants />
      </div>
    </div>
  );
};

const AllRestaurants = () => {
  const { results, isLoading } = useGetAllRestaurants();

  if (isLoading) return <div>Loading restaurants...</div>;

  if (!results || !results.data || results.data.length === 0)
    return <div>No restaurants yet</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.data.map((restaurant: any) => (
        <SearchResultCard key={restaurant._id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default HomePage;
