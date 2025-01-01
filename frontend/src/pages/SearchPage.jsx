import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore"; // Assuming you have a product store
import ProductCard from "../components/ProductCard"; // Your ProductCard component
import { motion } from "framer-motion";

const SearchPage = () => {
  const { query } = useParams(); // Capture the search query from the URL
  const { fetchProductsByName } = useProductStore();
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (query) {
        fetchProductsByName(query).then((response) => {
        // Check if response is not undefined and contains the expected data
        if (response && Array.isArray(response)) {
          setSearchResults(response); // Set the products returned from the fetch
        } else {
          setSearchResults([]); // If the response is not valid, set searchResults to an empty array
        }
      }).catch((error) => {
        console.error("Error fetching products:", error);
        setSearchResults([]); // Set an empty array if there's an error
      });
    }
  }, [query]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Search Results for:{" "}
          {query
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {searchResults.length === 0 ? (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
              No products found
            </h2>
          ) : (
            searchResults.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchPage;
