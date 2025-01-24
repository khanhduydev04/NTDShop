import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { RegisterPage } from "./pages/Auth/register";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginPage } from "./pages/Auth/login";
import ProductDetailPage from "./pages/Client/Products/productDetail";
import { CartPage } from "./pages/Client/Cart";
import { OderForm } from "./pages/Client/Cart/oderForm";
import OrderConfirmation from "./pages/Client/Cart/OrderConfirmation";
import { Profile } from "./pages/Client/Profile";
import Products from "./pages/Client/Products/products";
import HomePage from "./pages/Client/Home";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/dang-ky" element={<RegisterPage />} />
        </Route>

        {/* Client Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="san-pham" element={<Products />} />
          <Route path="san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="gio-hang" element={<CartPage />} />
          <Route path="thong-tin-dat-hang" element={<OderForm />} />
          <Route path="xac-nhan-dat-hang" element={<OrderConfirmation />} />
          <Route path="thong-tin-ca-nhan" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
