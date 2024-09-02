import React, { useEffect, useRef, useState } from "react";
import {
  AddReview,
  Button,
  EditProductQuantity,
  ProductCard,
  cartAndFavouritesContext,
  productContext,
  useAddToCart,
  useAddToFavourites,
  useAuthUI,
  useDeleteFromCartMutation,
  useDeleteFromFavourites,
} from "../constants/Imports";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProductById } from "../apiClient/productApi";
import { useParams } from "react-router-dom";
import { productData } from "../protectedRoute/ManageProductData";
import { cartItemProps } from "../Context/CartFavouritesContext";
import { calculateAverageReview } from "../components/UI/ProductCard";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const { data: game } = useQuery({
    queryFn: () => getProductById(productId as string),
    queryKey: ["getproductbyid", productId],
  });

  const [productQuantity, setProductQuantity] = useState("1");

  const { products: games } = productContext();

  const [related, setRelated] = useState<productData[]>([]);

  useEffect(() => {
    setRelated([]);
    if (games?.length && game) {
      const newRelated = games.filter((isRelated) =>
        isRelated.genre.some((genre) => game.genre.includes(genre))
      );
      setRelated(newRelated);
    }
  }, [game, games]);

  let averageRating = calculateAverageReview(game);

  const reviewRef = useRef(null);

  const scrollToReview = () => {};

  useEffect(() => {
    console.log(reviewRef.current);
  }, [reviewRef.current]);
  const { mutate: addToCart, isLoading: isLoadingAddToCart } = useAddToCart();

  const { mutate: deleteCartMutation, isLoading: isLoadingCartDeletion } =
    useDeleteFromCartMutation();

  const { mutate: addToFavourites, isLoading: loadingAddFavourites } =
    useAddToFavourites();

  const { mutate: removefromfavourites, isLoading: loadingRemoveFavourites } =
    useDeleteFromFavourites();

  const { currentUser, setAuthTab } = useAuthUI();

  const { favourites, cart } = cartAndFavouritesContext();

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <section className="header-margin">
      <ul className="flxRowCenter gap-2 w-fit text-sm font-[500] ml-5">
        <li>
          <Link to={"/"}>{"Home>"}</Link>
        </li>
        <li>
          <Link to={"/shop"}>{"Shop>"}</Link>
        </li>
        <li>product</li>
      </ul>
      {game ? (
        <section className="flxColStart wrapper mt-16">
          <section className="flxRowStart w-full max-md:flxColStart max-md:gap-5 border-b-[1px] pb-20">
            <div className="flex-1">
              <img
                className="w-full aspect-[16/10] object-cover"
                src={game?.images[1] || game?.images[0]}
                alt={game?.name}
              />
            </div>
            <div className="flex-1 flxColStart md:px-10 max-md:w-full max-w-[35rem]">
              <span className="text-sm text-black/60">
                {game.genre.join(", ")}
              </span>
              <h1 className="text-4xl font-bold">{game.name}</h1>
              <span className="flxRowStart text-sm gap-5 items-center mt-5 w-full justify-end">
                <div className="flxRowStart items-center gap-1">
                  <p>{averageRating}</p>
                  <i className="fa-solid fa-star text-yellow-400"></i>
                  <p>{"(" + game.reviews.length + ")"}</p>
                </div>
                <button className="hover:opacity-80">write a review</button>
              </span>
              <p className="w-full flxBtw items-center mt-5">
                <span className="text-2xl font-bold">${game.price}.00</span>
                {loadingAddFavourites || loadingRemoveFavourites ? (
                  <p>...</p>
                ) : (
                  <span className="cursor-pointer">
                    {favourites.find(
                      (itm) => itm.productId._id === game._id
                    ) ? (
                      <button
                        onClick={() => {
                          removefromfavourites(game._id as string);
                        }}
                        className="favourites-action-btn"
                      >
                        <p className="text-xs">Unsave</p>
                        <i className="fa-solid fa-heart"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (!currentUser.isAuthenticated) {
                            setAuthTab(true);
                          } else {
                            addToFavourites(game._id as string);
                          }
                        }}
                        className="favourites-action-btn"
                      >
                        <p className="text-xs">Save</p>
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    )}
                  </span>
                )}
              </p>
              <div className="mt-10 font-semibold w-full">
                {game.stock > 1 ? (
                  <div className="text-sm flex gap-10 ">
                    <span>
                      <i className="fa-solid fa-check"></i> In stock
                    </span>
                    <span>
                      <i className="fa-solid fa-truck"></i> Delivery available
                    </span>
                  </div>
                ) : (
                  "Out of stock"
                )}
              </div>
              <div className="w-full flxBtw items-center gap-3 mt-10">
                <EditProductQuantity
                  onchange={(e) => {
                    setProductQuantity(e.target.value);
                  }}
                  quantity={productQuantity}
                />
                {cart.find((itm) => itm.productId._id === game._id) ? (
                  <Button
                    disabled={isLoadingCartDeletion}
                    click={() => {
                      deleteCartMutation(game._id);
                    }}
                    name={
                      isLoadingAddToCart ? "removing..." : "remove from cart"
                    }
                    styles="text-white w-[80%] capitalize font-semibold"
                  />
                ) : (
                  <Button
                    disabled={isLoadingAddToCart}
                    click={() => {
                      const addGame: cartItemProps = {
                        productId: game,
                        quantity: 1,
                      };
                      addToCart(addGame);
                    }}
                    name={isLoadingAddToCart ? "adding" : "add to cart"}
                    styles="text-white w-[80%] capitalize font-semibold"
                  />
                )}
              </div>
            </div>
          </section>
          <hr />
          <section className="mt-16">
            <h1 className="text-xl font-semibold w-full">
              Product Description
            </h1>
            <p className="text-sm mt-5">{game.description}</p>
          </section>
          <AddReview ref={reviewRef} game={game} />
          <section className="mt-24">
            <h1 className="text-xl font-semibold w-full">You may also like</h1>
            <ul className="mt-20 flex flex-wrap gap-4 px-5 ">
              {related?.map((game) => (
                <ProductCard key={game._id} game={game} />
              ))}
            </ul>
          </section>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
};

export default ProductDetails;
