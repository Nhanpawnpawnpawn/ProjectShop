// src/routes/routes.js
import AuthView from "../views/AuthView";
import HomeView from "../views/HomeView";
import ProductView from "../views/ProductView";
import ShopView from "../views/ShopView";
import PersonalPageView from "../views/PersonalPageView";
import EditProductView from "../views/EditProductView";

const routes = [
  { path: "/auth", element: <AuthView /> },
  { path: "/", element: <HomeView /> },
  { path: "/product/:id", element: <ProductView /> },
  { path: "/shop/:shopName", element: <ShopView /> },
  { path: "/personalpage/:shopName", element: <PersonalPageView /> },
  { path: "/edit-product/:productId", element: <EditProductView /> },
];

export default routes;
