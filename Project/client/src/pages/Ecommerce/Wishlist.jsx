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

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Breadcrumb */}
        <p className="text-gray-600 text-md mb-5">
          <span
            className="cursor-pointer text-[#124734] hover:underline"
            onClick={() => navigate("/ecommerce-home")}
          >
            Home
          </span>{" "}
          &gt; My Wishlist
        </p>
        {/* TOP SECTION */}
        <div className="flex justify-between items-center mb-8 py-10">
          <h1 className="text-4xl font-bold text-[#124734]">My Wishlist</h1>
          </div>
         {/* If wishlist is empty */}
        {wishlist.length === 0 && (
          <p className="text-xl text-gray-500">No items in your wishlist.</p>
        )}

        {/* Same UI as Shop.jsx */}
        {wishlist.length > 0 && (
          <ProductNoSlider
            products={wishlist}
            cartItems={[]}        // you can pass real cart items later
            onCart={() => {}}     // optional
            columns={3}           // same layout
          />
        )}
           

       
      </div>
    </section>
       
        );
        };
export default Wishlist;