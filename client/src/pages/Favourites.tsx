import React from "react";
import { ProductCard, cartAndFavouritesContext } from "../constants/Imports";

const Favourites: React.FC = () => {
  const { favourites } = cartAndFavouritesContext();

  return (
    <div className="header-margin px-5">
      <h1 className="mb-5">Your Favourites</h1>
      <section>
        {favourites.length ? (
          <div>
            <ul className="flxRowStart flex-wrap gap-5">
              {favourites.map((itm) => (
                <ProductCard key={itm.productId._id} game={itm.productId} />
              ))}
            </ul>
          </div>
        ) : (
          <div>No favourite items</div>
        )}
      </section>
    </div>
  );
};

export default Favourites;
