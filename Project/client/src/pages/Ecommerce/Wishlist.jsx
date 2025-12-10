import EcomHeader from "../../components/EcomHeader";
import ProductNoSlider from "../../components/EcommerceHomeSlider/ProductNoSlider";
import { useWishlist } from "../../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <section className="pb-20 pt-36">
      <EcomHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <p className="text-gray-600 text-sm md:text-md mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; My Wishlist
        </p>

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 py-6 md:py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#124734]">
            My Wishlist
          </h1>
        </div>

        {/* EMPTY STATE */}
        {wishlist.length === 0 && (
          <p className="text-lg md:text-xl text-gray-500 mt-4">
            No items in your wishlist.
          </p>
        )}

        {/* PRODUCT GRID */}
        {wishlist.length > 0 && (
          <ProductNoSlider
            products={wishlist}
            cartItems={[]}
            onCart={() => {}}
            columns={3}
          />
        )}
      </div>
    </section>
  );
};

export default Wishlist;
