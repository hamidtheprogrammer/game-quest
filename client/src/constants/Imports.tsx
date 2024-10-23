import Layout from "../Layout";
import Header from "../components/Header";
import { navItems } from ".";
import Home from "../pages/Home";
import MobileNav from "../components/MobileNav";
import Button from "../components/UI/Button";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Auth from "../components/auth/Auth";
import { memberPerks } from ".";
import {
  GlobalProps,
  GlobalState,
  GlobalContext,
} from "../Context/GlobalContext";
import { useContext } from "react";
import Myaccount from "../pages/Myaccount";
import MyAccountNav from "../components/auth/MyAccountNav";
import Logout from "../components/auth/Logout";
import { accountNav } from ".";
import MyAccountDetails from "../components/auth/MyAccountDetails";
import AdminDasboard from "../protectedRoute/AdminDasboard";
import { adminNav } from ".";
import DisplayUsers from "../protectedRoute/DisplayUsers";
import AddProduct from "../protectedRoute/AddProduct";
import { genreOptions } from ".";
import { ProductContext, productContextProp } from "../Context/ProductContext";
import Shop from "../pages/Shop";
import PageBanner from "../components/UI/PageBanner";
import ProductDetails from "../pages/ProductDetails";
import Footer from "../components/Footer";
import ProductCard from "../components/UI/ProductCard";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import ManageProductData from "../protectedRoute/ManageProductData";
import GetProducts from "../protectedRoute/GetProducts";
import UpdateProduct from "../protectedRoute/UpdateProduct";
import Cart from "../pages/Cart";
import CartFavouritesState, {
  cartFavouritesProps,
  cartItemProps,
} from "../Context/CartFavouritesContext";
import { CartFavouritesContext } from "../Context/CartFavouritesContext";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import * as cartApi from "../apiClient/cartApi";
import * as favouritesApi from "../apiClient/favouritesApi";
import { customError } from "../apiClient/authApi";
import EditProductQuantity from "../components/UI/EditProductQuantity";
import { useQueryClient } from "react-query";
import Favourites from "../pages/Favourites";
import AddReview from "../components/AddReview";

export const useAuthUI = (): GlobalProps => {
  const {
    authTab,
    setAuthTab,
    currentAuth,
    setCurrentAuth,
    currentUser,
    accountTab,
    setAccountTab,
  } = useContext(GlobalState);

  return {
    authTab,
    setAuthTab,
    currentAuth,
    setCurrentAuth,
    currentUser,
    accountTab,
    setAccountTab,
  };
};

export const productContext = (): productContextProp => {
  const { products, setProducts, query, setQuery, pagination, setPagination } =
    useContext(ProductContext);
  return { products, setProducts, query, setQuery, pagination, setPagination };
};

export const cartAndFavouritesContext = (): cartFavouritesProps => {
  const { cart, setCart, favourites, setFavourites } = useContext(
    CartFavouritesContext
  );

  return { cart, setCart, favourites, setFavourites };
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (game: cartItemProps) => cartApi.addToCart(game),
    onSuccess: () => {
      toast.success("Item added to cart");
      queryClient.invalidateQueries("get-cart");
    },
    onError: (error: customError) => {
      toast.error("Failed to add item to cart");
      console.log(error);
    },
  });

  return mutation;
};

const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (game: cartItemProps) => cartApi.updateCart(game),
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries("get-cart");
    },
    onError: (error: customError) => {
      toast.error("Failed to update cart");
      queryClient.invalidateQueries("get-cart");
      console.log(error);
    },
  });

  return mutation;
};

const useDeleteFromCartMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => cartApi.deleteFromCart(id),
    onSuccess: () => {
      toast.success("Cart updated");
      queryClient.invalidateQueries("get-cart");
    },
    onError: (error: customError) => {
      toast.error("Failed to update cart");
      queryClient.invalidateQueries("get-cart");
      console.log(error);
    },
  });

  return mutation;
};

export const useAddToFavourites = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (game: string) => favouritesApi.addToFavourites(game),
    onSuccess: () => {
      toast.success("Item added to favourites");
      queryClient.invalidateQueries("get-favourites");
    },
    onError: (error: customError) => {
      toast.error("Failed to add item to favourites");
      console.log(error);
    },
  });

  return mutation;
};

const useDeleteFromFavourites = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => favouritesApi.deleteFromFavourites(id),
    onSuccess: () => {
      toast.success("Favourites updated");
      queryClient.invalidateQueries("get-favourites");
    },
    onError: (error: customError) => {
      toast.error("Failed to update favourites");
      console.log(error);
    },
  });

  return mutation;
};

export {
  Layout,
  Header,
  navItems,
  Home,
  MobileNav,
  Button,
  Register,
  Login,
  Auth,
  memberPerks,
  GlobalContext,
  GlobalState,
  Myaccount,
  MyAccountNav,
  Logout,
  accountNav,
  MyAccountDetails,
  AdminDasboard,
  adminNav,
  DisplayUsers,
  AddProduct,
  genreOptions,
  Shop,
  PageBanner,
  ProductDetails,
  Footer,
  ProductCard,
  Pagination,
  Filter,
  ManageProductData,
  GetProducts,
  UpdateProduct,
  Cart,
  CartFavouritesState,
  EditProductQuantity,
  useUpdateCart,
  useDeleteFromCartMutation,
  Favourites,
  useDeleteFromFavourites,
  AddReview,
};
