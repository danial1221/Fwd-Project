import hero from "../assets/hero.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (values: SearchForm) => {
    if (values.searchQuery && values.searchQuery.trim().length > 0) {
      navigate(`/search/${values.searchQuery}`);
    }
  };

  const scrollToAll = () => {
    const el = document.getElementById("all-restaurants");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={hero}
        className="w-full h-[560px] object-cover brightness-75"
        alt="hero"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Delicious food, delivered fast
          </h1>
          <p className="mt-3 text-lg md:text-xl text-orange-100/90">
            Discover nearby restaurants and order your favourites in minutes.
          </p>

          <div className="mt-6 mx-auto max-w-2xl">
            <SearchBar
              onSubmit={handleSearchSubmit}
              placeHolder="Search by city, cuisine or restaurant"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={scrollToAll}
              className="px-6 py-3 rounded-full bg-white text-orange-600 font-bold shadow-md hover:scale-105 transition-transform"
            >
              Browse Restaurants
            </button>
            <button
              onClick={() => navigate("/auth-callback")}
              className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:opacity-90"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
