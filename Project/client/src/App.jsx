import { Routes, Route } from "react-router-dom";

import AskDoubtSection from "./pages/AskDoubt/AskDoubtSection";
import ResearchReport from "./pages/ResearchReport/ResearchReport";
import ReportDetails from "./pages/ResearchReport/ReportDetails";
import Scholarship from "./pages/Scholarship/Scholarship";
import TestAndLearning from "./pages/Test&Learning/Test";
import TestDetails from "./pages/Test&Learning/TestDetails";
import Donation from "./pages/Donation/Donate";
import DonationAmount from "./pages/Donation/DonateAmount";
import AboutUs from "./pages/AboutUs/AboutUs";
import Career from "./pages/AboutUs/Career";
import JobDetail from "./pages/AboutUs/JobDetail";
import ContactDetails from "./pages/ContactUs/ContactDetails";
import News from "./pages/News/News";
import NewsDetails from "./pages/News/NewsDetails";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/Blog/BlogDetail";
import ParentCompany from "./pages/ContactUs/ParentCompany";
import Ecommerce from "./pages/Ecommerce/EcommerceHome";
import Profile from "./pages/Ecommerce/MyProfile";
import MyOrder from "./pages/Ecommerce/MyOrder";
import Categories from "./pages/Ecommerce/Categories";
import ProductListPage from "./pages/Ecommerce/ProductListPage";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetail from "./pages/Ecommerce/ProductDetail";
import Shop from "./pages/Ecommerce/Shop";
import Wishlist from "./pages/Ecommerce/Wishlist";
import Cart from "./pages/Ecommerce/Cart";
import Checkout from "./pages/Ecommerce/Checkout";
import Supplier from "./pages/Ecommerce/Supplier/Supplier";
import AddProduct from "./pages/Ecommerce/Supplier/AddProduct";
import ProductList from "./pages/Ecommerce/Supplier/ProductList";
import Orders from "./pages/Ecommerce/Supplier/Orders";






function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      
      <Route path="/ask-doubt" element={<AskDoubtSection />} />
       <Route path="/research-report" element={<ResearchReport />} />
       <Route path="/research-report/:id" element={<ReportDetails />} />
       <Route path="/scholarship" element={<Scholarship />} />
       <Route path="/test-learning" element={<TestAndLearning />} />
       <Route path="/test-learning/:id" element={<TestDetails />} />
       <Route path="/donate" element={<Donation />} />
        <Route path="/about-us" element={<AboutUs />} />
       <Route path="/donate-amount" element={<DonationAmount />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/:id" element={<JobDetail />} />
        <Route path="/contact-us" element={<ContactDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/blog" element={<Blog />} />
         <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/parent-company" element={<ParentCompany />} />
        <Route path="/ecommerce-home" element={<Ecommerce />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products/:type" element={<ProductListPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/my-cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/supplier/add-product" element={<AddProduct />} />
        <Route path="/supplier/product-list" element={<ProductList />} />
        <Route path="/supplier/orders" element={<Orders />} />

       

    </Routes>
      </>
  );
}

export default App;
