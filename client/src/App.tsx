import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import {
  Home,
  Auth,
  useAuthUI,
  Myaccount,
  MyAccountNav,
  AdminDasboard,
  Shop,
  ProductDetails,
  Cart,
  Favourites,
} from "./constants/Imports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const { currentAuth, currentUser, authTab } = useAuthUI();
  return (
    <main className="overflow-x-hidden">
      <ToastContainer />
      <div
        className={`fixed inset-0 w-full h-full pointer-events-none transition duration-200 ${
          authTab && "opacity-20"
        } opacity-0 bg-black z-20`}
      ></div>
      <Auth authMode={currentAuth} />
      {currentUser.isAuthenticated && <MyAccountNav />}
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        ></Route>
        <Route
          path="/my-account/:tab"
          element={
            <Layout>
              <Myaccount />
            </Layout>
          }
        ></Route>
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDasboard />
            </Layout>
          }
        ></Route>
        <Route
          path="/shop"
          element={
            <Layout>
              <Shop />
            </Layout>
          }
        ></Route>
        <Route
          path="/product-details/:productId"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        ></Route>
        <Route
          path="/Favourites"
          element={
            <Layout>
              <Favourites />
            </Layout>
          }
        ></Route>
      </Routes>
    </main>
  );
};

export default App;
