import React from "react";
import { Link } from "react-router-dom";
import { productData } from "../../protectedRoute/ManageProductData";
import { cartItemProps } from "../../Context/CartFavouritesContext";
import {
  cartAndFavouritesContext,
  useAddToCart,
  useAddToFavourites,
  useAuthUI,
  useDeleteFromFavourites,
} from "../../constants/Imports";

interface gameProp {
  game: productData;
}

export const calculateAverageReview = (game: productData): number => {
  let averageRating: number;
  if (game && game.reviews && game.reviews.length) {
    const sumOfGameRating = game.reviews.reduce((accumlator, currentRating) => {
      return accumlator + currentRating.rating;
    }, 0);

    averageRating = parseFloat(
      (sumOfGameRating / game.reviews.length).toFixed(1)
    );
    return averageRating;
  } else {
    return 0;
  }
};

const ProductCard: React.FC<gameProp> = ({ game }) => {
  const { setAuthTab, currentUser } = useAuthUI();
  const { favourites } = cartAndFavouritesContext();
  const { mutate, isLoading } = useAddToCart();
  const { mutate: addToFavourites, isLoading: loadingAddFavourites } =
    useAddToFavourites();

  const { mutate: removefromfavourites, isLoading: loadingRemoveFavourites } =
    useDeleteFromFavourites();

  let averageRating = calculateAverageReview(game);

  return (
    <li className="product-card-wrapper space-y-5 group pt-5 min-h-[25rem]">
      <Link key={game._id} to={`/product-details/${game._id}`}>
        <div className="w-full h-[50%]">
          <span className="absolute right-[0] top-[0] primaryBg rounded-[9999px] text-white p-2 -translate-x-full translate-y-1/3">
            <p className="relative h-[2rem] w-[2rem] flxColCenter justify-center">
              ${game.price}
            </p>
          </span>
          <img
            className="object-cover h-full aspect-[13/16]  mx-auto"
            src={game.images ? (game?.images[0] as string) : ""}
            alt=""
          />{" "}
        </div>
      </Link>
      <div className="px-5 pt-5 flxBtw">
        {loadingAddFavourites || loadingRemoveFavourites ? (
          <p>...</p>
        ) : (
          <span className="cursor-pointer">
            {favourites.find((itm) => itm.productId._id === game._id) ? (
              <i
                onClick={() => {
                  removefromfavourites(game._id as string);
                }}
                className="fa-solid fa-heart"
              ></i>
            ) : (
              <i
                onClick={() => {
                  if (!currentUser.isAuthenticated) {
                    setAuthTab(true);
                  } else {
                    addToFavourites(game._id as string);
                  }
                }}
                className="fa-regular fa-heart"
              ></i>
            )}
          </span>
        )}
        <span className="flxBtw gap-1 items-center">
          <p className="text-sm">{averageRating}</p>
          <i className="fa-solid fa-star text-yellow-400"></i>
        </span>
      </div>
      <h1 className="flxBtw p-5 items-center">
        <div className="flxColStart w-fit">
          <span className="text-black/60 text-xs">{game.genre[0]}</span>
          <span className="text-sm font-bold text-black/90 group-hover:text-red-500 max-w-[85%]">
            {game.name}
          </span>
        </div>
        <button
          disabled={isLoading}
          onClick={() => {
            if (!currentUser.isAuthenticated) {
              setAuthTab(true);
            } else {
              const addGame: cartItemProps = { productId: game, quantity: 1 };
              mutate(addGame);
            }
          }}
          className="primaryBg rounded-full aspect-square text-white flxColCenter justify-center group-hover:bg-black w-[30%] max-w-[3rem]"
        >
          {isLoading ? (
            <p>...</p>
          ) : (
            <i className="fa-solid fa-cart-shopping text-sm"></i>
          )}
        </button>
      </h1>
    </li>
  );
};

export default ProductCard;
